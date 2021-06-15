import { useNavigation, useRoute } from "@react-navigation/core";
import { format } from "date-fns";
import React, { useCallback } from "react";
import { Alert } from "react-native";
import api from "../../../libs/api";
import Header from "../../Header";

import {
  Container,
  Text,
  ContainerInvestSelect,
  ButtonAlter,
  ButtonExcl,
  ContainerButton,
} from "./styles";

interface Params {
  invest: Object;
}
const CardPrimary: React.FC = () => {
  const route = useRoute();
  const navigate = useNavigation();
  const { invest } = route.params as Params;
  const id = invest.id;

  const handleInvestDelete = useCallback(async () => {
    const invest = await api.delete(`invest/${id}`);
    Alert.alert("Investimento deletado");
    navigate.navigate("Invest");
  }, []);

  const handleInvestAlter = useCallback(() => {
    navigate.navigate("CardAlter", { invest });
  }, []);

  return (
    <Container>
      <Header> Investimento Selecionado </Header>
      <ContainerInvestSelect>
        <Text>Nome: {invest.name}</Text>
        <Text>Data: {format(new Date(invest.date), "MM/dd/yyy")}</Text>
        <Text>Mês: {invest.mes}</Text>
        <Text>Valor: {invest.value}</Text>
        <ContainerButton>
          <ButtonAlter onPress={handleInvestAlter}>
            <Text>Editar</Text>
          </ButtonAlter>
          <ButtonExcl onPress={handleInvestDelete}>
            <Text>Excluir</Text>
          </ButtonExcl>
        </ContainerButton>
      </ContainerInvestSelect>
    </Container>
  );
};
export default CardPrimary;
