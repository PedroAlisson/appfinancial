import React, { useCallback, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Alert, KeyboardAvoidingView, Platform, Text } from "react-native";
import api from "../../../libs/api";
import Header from "../../Header";

import { Container, ViewHeader } from "./styles";

import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as Yup from "yup";
import Input from "../../Input";
import Button from "../../Button";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import HeaderBack from "../../HeaderBack";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

interface Params {
  invest: Object;
}

interface InvestPropsAlterRequest {
  name: string;
  mes: string;
  value: number;
  date: Date;
  user_id: string;
  amount: number;
}
const CardInvestAlter: React.FC = () => {
  const route = useRoute();
  const navigate = useNavigation();
  const { invest } = route.params as Params;
  const id = invest.id;
  const formRef = useRef<FormHandles>(null);
  const mesInputRef = useRef<TextInput>(null);
  const valueInputRef = useRef<TextInput>(null);
  const dateInputRef = useRef<TextInput>(null);
  const amountInputRef = useRef<TextInput>(null);

  const handleInvestAlter = useCallback(
    async (data: InvestPropsAlterRequest) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome Obrigatório"),
          mes: Yup.string().required("Mes obrigatiorio"),
          value: Yup.number().required("Valor Obrigatória"),
          date: Yup.date().required("Data Obrigatória"),
          amount: Yup.string().required("Quantidade Obrigatória"),
        });

        //   await schema.validate(data, {
        //      abortEarly: false,
        //   });
        //

        const { name, mes, value, date, amount } = data;

        const user = await AsyncStorage.getItem("@Financial:Id");

        const token = await AsyncStorage.getItem("@Financial:Token");

        const user_id = JSON.parse(user);

        api.defaults.headers.Authorization = `Baerer ${token}`;

        const invest = await api.put(`/invest/${id}`, {
          name,
          mes,
          value,
          date,
          user_id,
          amount,
        });

        Alert.alert("Investimento Alterado com sucesso");
        navigate.navigate("Investimentos");
      } catch (error) {
        Alert.alert("Erro ao Alterar investimento");
      }
    },
    []
  );

  return (
    <>
      <ViewHeader>
        <HeaderBack>Altere seu Investimento </HeaderBack>
      </ViewHeader>

      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <Form
              initialData={invest}
              ref={formRef}
              onSubmit={handleInvestAlter}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="info"
                defaultValue={invest.name}
                returnKeyType="next"
                onSubmitEditing={() => {
                  mesInputRef.current?.focus();
                }}
              />
              <Input
                ref={mesInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="mes"
                icon="calendar"
                defaultValue={invest.mes}
                placeholder="Mes"
                returnKeyType="next"
                onSubmitEditing={() => {
                  amountInputRef.current?.focus();
                }}
              />
              <Input
                ref={amountInputRef}
                autoCorrect={false}
                keyboardType="numeric"
                autoCapitalize="none"
                name="amount"
                defaultValue={invest.amount.toString()}
                icon="settings"
                placeholder="Quantidade"
                returnKeyType="next"
                onSubmitEditing={() => {
                  valueInputRef.current?.focus();
                }}
              />
              <Input
                ref={valueInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="value"
                defaultValue={invest.value}
                icon="dollar-sign"
                placeholder="Valor"
                returnKeyType="next"
                onSubmitEditing={() => {
                  dateInputRef.current?.focus();
                }}
              />
              <Input
                ref={dateInputRef}
                name="date"
                icon="calendar"
                defaultValue={format(new Date(invest.date), "MM/dd/yyy")}
                placeholder="Data Compra"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Alterar Investimento
              </Button>
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
};
export default CardInvestAlter;
