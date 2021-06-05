import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import api from "../../libs/api";

import { Container, ViewInvest } from "./styles";
import { useNavigation } from "@react-navigation/core";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardInvest from "../../components/Cards/CardInvest";

interface selectPropsInvest {
  data: { id: string; name: string; mes: string; value: number; date: Date };
}

const Invest: React.FC = () => {
  const [invest, setInvest] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function findInvest() {
      const token = await AsyncStorage.getItem("@Financial:Token");

      api.defaults.headers.Authorization = `Baered ${token}`;
      const res = await api.get("invest");
      const resultsInvest = res.data;

      if (resultsInvest) {
        setInvest(resultsInvest);
      }
      return;
    }
    findInvest();
    return;
  }, []);

  function handleFindInvest(invest: selectPropsInvest) {
    navigation.navigate("Card", { invest });
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>
        <Header> Escolha seu investimento </Header>
        <ViewInvest>
          <FlatList
            data={invest}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CardInvest data={item} onPress={() => handleFindInvest(item)} />
            )}
          />
        </ViewInvest>
      </Container>
    </ScrollView>
  );
};

export default Invest;
