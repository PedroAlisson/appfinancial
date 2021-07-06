import { useNavigation } from "@react-navigation/core";
import React, { Children, useEffect } from "react";
import { RectButtonProperties } from "react-native-gesture-handler";
import Header from "../../components/Header";
import {
  TouchableOpacity,
  Text,
  ContainerMenu,
  Icon,
  Image,
  Container,
  ContainerMenuTotal,
  ContainerTotal,
  CardTotal,
  TextTotal,
} from "./style";
import api from "../../libs/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

interface RectProps extends RectButtonProperties {}
interface TotalProps {
  resultsInvest: number;
  resultsBill: number;
}

const Home: React.FC<RectProps> = ({ children, ...rest }) => {
  const navigation = useNavigation();
  const [invest, setInvest] = useState(null);

  const [bill, setBill] = useState(null);

  useEffect(() => {
    async function findTotal() {
      const token = await AsyncStorage.getItem("@Financial:Token");
      api.defaults.headers.Authorization = `Baered ${token}`;

      const results = await api.get<TotalProps>("count");

      if (results) {
        const { resultsBill, resultsInvest } = results.data;
        setBill(resultsBill);
        setInvest(resultsInvest);
      }
    }
    findTotal();
  }, []);

  return (
    <Container>
      <Header></Header>

      <ContainerMenu>
        <TouchableOpacity>
          <Icon name="home" size={25} color="#fff"></Icon>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Invest")}>
          <Icon name="repeat" size={25} color="#fff"></Icon>
          <Text>Investimentos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Bill")}>
          <Icon name="dollar-sign" size={25} color="#fff"></Icon>
          <Text>Contas</Text>
        </TouchableOpacity>
      </ContainerMenu>

      <ContainerTotal>
        <Text>Visão geral Investimentos e Contas Cadastradas</Text>
        <ContainerMenuTotal>
          <CardTotal>
            <Icon name="repeat" size={25} color="#fff"></Icon>
            <TextTotal>Investimentos</TextTotal>
            <TextTotal>Total: {invest}</TextTotal>
          </CardTotal>
          <CardTotal>
            <Icon name="dollar-sign" size={25} color="#fff"></Icon>
            <TextTotal>Contas</TextTotal>

            <TextTotal> Total: {bill}</TextTotal>
          </CardTotal>
        </ContainerMenuTotal>
      </ContainerTotal>
    </Container>
  );
};

export default Home;
