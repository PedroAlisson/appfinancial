import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Header from "../../components/Header";
import api from "../../libs/api";
import CardBill from "../../components/Cards/CardBill";

import { Container, ViewBill } from "./styles";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";

interface selectPropsBill {
  data: {
    id: string;
    name: string;
    mes: string;
    value: number;
    date: Date;
    status: string;
  };
}

const Bill: React.FC = () => {
  const [bill, setBill] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function findBills() {
      const token = await AsyncStorage.getItem("@Financial:Token");

      api.defaults.headers.Authorization = `Baered ${token}`;
      const bills = await api.get("bills");
      const resultsBill = bills.data;

      if (resultsBill) {
        setBill(resultsBill);
      }
      return;
    }
    findBills();
  }, []);

  function handleFindBill(bill: selectPropsBill) {
    navigation.navigate("CardBill", { bill });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Header> Escolha suas Depesas </Header>
          <ViewBill>
            <FlatList
              data={bill}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <CardBill data={item} onPress={() => handleFindBill(item)} />
              )}
            />
          </ViewBill>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Bill;
