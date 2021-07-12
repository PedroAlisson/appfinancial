import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import Header from "../../components/Header";
import api from "../../libs/api";
import CardBill from "../../components/Cards/CardBill";

import { Container, ViewBill, ViewHeaderBill } from "./styles";
import { useNavigation } from "@react-navigation/core";
import { useFocusEffect } from "@react-navigation/native";
import HeaderBack from "../../components/HeaderBack";

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

  useFocusEffect(() => {
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
  });

  function handleFindBill(bill: selectPropsBill) {
    navigation.navigate("CardBill", { bill });
  }

  return (
    <>
      <ViewHeaderBill>
        <HeaderBack> Escolha suas Depesas </HeaderBack>
      </ViewHeaderBill>
      <Container>
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
    </>
  );
};

export default Bill;
