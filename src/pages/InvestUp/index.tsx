import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useRef } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { Alert, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import api from "../../libs/api";
import { Container, ViewHeader } from "./styles";

import { ScrollView } from "react-native-gesture-handler";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import Input from "../../components/Input";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import HeaderBack from "../../components/HeaderBack";

interface InvestPropsRequest {
  name: string;
  mes: string;
  value: number;
  date: Date;
  user_id: string;
  amount: string;
}

const InvestUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const mesInputRef = useRef<TextInput>(null);
  const valueInputRef = useRef<TextInput>(null);
  const dateInputRef = useRef<TextInput>(null);
  const amountInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleInvestUp = useCallback(
    async (data: InvestPropsRequest, { reset }) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome Obrigatório"),
          mes: Yup.string().required("Mes obrigatiorio"),
          value: Yup.number().required("Valor Obrigatória"),
          date: Yup.date().required("Data Obrigatória"),
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

        const invest = await api.post("/invest", {
          name,
          mes,
          value,
          date,
          user_id,
          amount,
        });

        Alert.alert("Investimento cadastrado com sucesso");
        reset();
        navigation.navigate("Investimentos");
      } catch (error) {
        Alert.alert("Erro ao cadastrar investimento");
      }
    },
    []
  );

  return (
    <>
      <ViewHeader>
        <HeaderBack>Cadastre seu Investimento </HeaderBack>
      </ViewHeader>

      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <Form ref={formRef} onSubmit={handleInvestUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="info"
                placeholder="Nome do ativo"
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
                placeholder="Mes"
                returnKeyType="next"
                onSubmitEditing={() => {
                  amountInputRef.current?.focus();
                }}
              />
              <Input
                ref={amountInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="amount"
                icon="dollar-sign"
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
                placeholder="Data Compra"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar Investimento
              </Button>
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
};

export default InvestUp;
