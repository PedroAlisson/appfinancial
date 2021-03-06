import { useNavigation, useRoute } from "@react-navigation/core";
import { format } from "date-fns";
import React, { useCallback } from "react";
import { Alert } from "react-native";
import api from "../../../libs/api";
import HeaderBack from "../../HeaderBack";

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
  const navigation = useNavigation();
  const { invest } = route.params as Params;
  const id = invest.id;

  const handleInvestDelete = useCallback(async () => {
    const invest = await api.delete(`invest/${id}`);
    Alert.alert("Investimento deletado");

    navigation.navigate("Investimentos");
  }, []);

  const handleInvestAlter = useCallback(() => {
    navigation.navigate("CardAlter", { invest });
  }, []);

  return (
    <Container>
      <HeaderBack> Investimento Selecionado </HeaderBack>
      <ContainerInvestSelect>
        <Text>Nome: {invest.name}</Text>
        <Text>Data: {format(new Date(invest.date), "MM/dd/yyy")}</Text>
        <Text>Mês: {invest.mes}</Text>
        <Text>Quantidade: {invest.amount}</Text>
        <Text>Valor: {invest.value}</Text>
        <Text>Total: {invest.total}</Text>
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
            <Icon name="trash" size={20} color="#fff">
              <TextButton>Excluir</TextButton>
            </Icon>
          </Button>
        </ContainerButton>
      </ContainerInvestSelect>
    </Container>
  );
};
export default CardPrimary;
