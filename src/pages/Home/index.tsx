import { useNavigation } from "@react-navigation/core";
import React, { Children, useEffect } from "react";
import { RectButtonProperties } from "react-native-gesture-handler";
import Header from "../../components/Header";
import {
  Container,
  Card,
  Text,
  Icon,
  TouchableOpacity,
  CardHome,
  TextButton,
  TextInformation,
} from "./style";
import api from "../../libs/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

interface RectProps extends RectButtonProperties {}
interface TotalProps {
  resultsInvest: number;
  resultsBill: number;
}

const Home: React.FC<RectProps> = ({ children, ...rest }) => {
  const navigation = useNavigation();
  const [invest, setInvest] = useState(null);

  const [bill, setBill] = useState(null);
  const [investTotal, setInvestTotal] = useState(null);

  const [billTotal, setBillTotal] = useState(null);

  useFocusEffect(() => {
    async function findTotal() {
      const token = await AsyncStorage.getItem("@Financial:Token");
      api.defaults.headers.Authorization = `Baered ${token}`;

      const results = await api.get<TotalProps>("count");

      if (results) {
        const { resultsBill, resultsInvest, SumTotalInvest, SumTotalBill } =
          results.data;
        setBill(resultsBill);
        setInvest(resultsInvest);
        setInvestTotal(SumTotalInvest);
        setBillTotal(SumTotalBill);
      }
    }
    findTotal();
  });

  const navigationInvest = useCallback(() => {
    navigation.navigate("Invest");
  }, []);

  const navigationBill = useCallback(() => {
    navigation.navigate("Bill");
  }, []);

  return (
    <Container>
      <Header></Header>
      <ScrollView>
        <Card>
          <CardHome>
            <Text>Total de Investimentos</Text>
            <TextInformation>
              {" "}
              <Icon name="repeat" size={25} color="#fff">
                {invest}
              </Icon>{" "}
              Registros
            </TextInformation>
            <TextInformation>
              {" "}
              <Icon name="dollar-sign" size={25} color="#fff">
                {investTotal}
              </Icon>{" "}
              Investido
            </TextInformation>
          </CardHome>
        </Card>
        <Card>
          <CardHome>
            <Text>Total de Contas</Text>
            <TextInformation>
              {" "}
              <Icon name="repeat" size={25} color="#fff">
                {bill}
              </Icon>{" "}
              Registros
            </TextInformation>
            <TextInformation>
              {" "}
              <Icon name="dollar-sign" size={25} color="#fff">
                {billTotal}
              </Icon>{" "}
              Contas
            </TextInformation>
          </CardHome>
        </Card>
        <Card>
          <CardHome>
            <Text>Investimento</Text>
            <TextInformation>
              àrea destinada para investimentos, caso queira cadastrar ou
              visualizar seus investimentos basta clicar no botão investimentos.
            </TextInformation>
            <TouchableOpacity onPress={navigationInvest}>
              <TextButton> Investimentos</TextButton>
            </TouchableOpacity>
          </CardHome>
        </Card>
        <Card>
          <CardHome>
            <Text>Contas</Text>
            <TextInformation>
              àrea destinada para contas, caso queira cadastrar ou visualizar
              suas contas basta clicar no botão contas.
            </TextInformation>
            <TouchableOpacity onPress={navigationBill}>
              <TextButton> Contas</TextButton>
            </TouchableOpacity>
          </CardHome>
        </Card>
      </ScrollView>
    </Container>
  );
};

export default Home;
