import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import api from "../../libs/api";

import { Container, ViewInvest, TextInvest, SelectView } from "./styles";
import { useNavigation } from "@react-navigation/core";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface selectPropsInvest {
  id: string;
  name: string;
  mes: string;
  value: number;
  date: Date;
}

interface UserPropsRequest {
  id: string;
  token: string;
}

const Invest: React.FC = () => {
  const [invest, setInvest] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function findInvest(data: selectPropsInvest) {
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

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>
        <Header> Escolha seu investimento </Header>
        <ViewInvest>
          <FlatList
            data={invest}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SelectView>
                <TextInvest>Nome: {item.name}</TextInvest>
                <TextInvest>Data: {item.date}</TextInvest>
                <TextInvest>Mês: {item.mes}</TextInvest>
                <TextInvest>Valor: {item.value}</TextInvest>
              </SelectView>
            )}
          />
        </ViewInvest>
      </Container>
    </ScrollView>
  );
};

export default Invest;
