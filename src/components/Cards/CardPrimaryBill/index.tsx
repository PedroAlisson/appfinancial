import { useNavigation, useRoute } from "@react-navigation/core";
import { format } from "date-fns";
import React, { useCallback } from "react";
import { Alert } from "react-native";
import api from "../../../libs/api";
import Header from "../../Header";

import {
  Container,
  Text,
  ContainerBillSelect,
  Button,
  ContainerButton,
  Icon,
  TextButton,
} from "./styles";

interface Params {
  bill: Object;
}
const CardPrimaryBill: React.FC = () => {
  const route = useRoute();
  const navigate = useNavigation();
  const { bill } = route.params as Params;
  const id = bill.id;

  const handleInvestDelete = useCallback(async () => {
    const bills = await api.delete(`bills/${id}`);
    Alert.alert("Investimento deletado");
    navigate.navigate("Bill");
  }, []);

  const handleInvestAlter = useCallback(() => {
    navigate.navigate("CardAlter", { bill });
  }, []);

  return (
    <Container>
      <Header> Investimento Selecionado </Header>
      <ContainerBillSelect>
        <Text>Nome: {bill.name}</Text>
        <Text>Data: {format(new Date(bill.date), "MM/dd/yyy")}</Text>
        <Text>Mês: {bill.mes}</Text>
        <Text>Valor: {bill.value}</Text>
        <Text>Status: {bill.status}</Text>
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
      </ContainerBillSelect>
    </Container>
  );
};
export default CardPrimaryBill;
