import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../libs/api";

import { Container, ViewInvest, ViewHeaderInvest } from "./styles";
import { useNavigation } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";
import CardInvest from "../../components/Cards/CardInvest";
import { useFocusEffect } from "@react-navigation/native";
import HeaderBack from "../../components/HeaderBack";

interface selectPropsInvest {
  data: { id: string; name: string; mes: string; value: number; date: Date };
}

const Invest: React.FC = () => {
  const [invest, setInvest] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    async function findInvest() {
      const token = await AsyncStorage.getItem("@Financial:Token");
      api.defaults.headers.Authorization = `Baered ${token}`;
      const response = await api.get("invest");
      const resultsInvest = response.data;
      //  const investimento = [];

      if (resultsInvest) {
        //   investimento.push([...resultsInvest, invest]);
        //   console.log(investimento);
        setInvest(resultsInvest);
      }
      return;
    }
    findInvest();
  });

  function handleFindInvest(invest: selectPropsInvest) {
    navigation.navigate("Card", { invest });
  }

  return (
    <>
      <ViewHeaderInvest>
        <HeaderBack>Selecione seu Investimento </HeaderBack>
      </ViewHeaderInvest>
      <Container>
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
    </>
  );
};

export default Invest;
