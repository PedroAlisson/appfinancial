import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Header from "../../components/Header";
import api from "../../libs/api";
import CardBill from "../../components/Cards/CardBill";

import { Container, ViewBill } from "./styles";

const Bill: React.FC = () => {
  const [bill, setBill] = useState([]);

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

  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="findBills">
        <Container>
          <Header> Escolha suas Depesas </Header>
          <ViewBill>
            <FlatList
              data={bill}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <CardBill data={item} onPress={() => findBills(item)} />
              )}
            />
          </ViewBill>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default Bill;
