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
  Button,
  ContainerButton,
  Icon,
  TextButton,
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
          <Button
            style={{ backgroundColor: "orange" }}
            onPress={handleInvestAlter}
          >
            <Icon name="edit-2" size={20} color="#fff">
              <TextButton>Editar</TextButton>
            </Icon>
          </Button>
          <Button
            style={{ backgroundColor: "red" }}
            onPress={handleInvestDelete}
          >
            <Icon name="delete" size={20} color="#fff">
              <TextButton>Excluir</TextButton>
            </Icon>
          </Button>
        </ContainerButton>
      </ContainerInvestSelect>
    </Container>
  );
};
export default CardPrimary;
