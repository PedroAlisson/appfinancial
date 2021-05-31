import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import api from "../../libs/api";
import { Container, ViewHeader } from "./styles";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import Input from "../../components/Input";
import * as Yup from "yup";

interface InvestPropsRequest {
  name: string;
  mes: string;
  value: number;
  date: Date;
  user_id: string;
}

const InvestUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const mesInputRef = useRef<TextInput>(null);
  const valueInputRef = useRef<TextInput>(null);
  const dateInputRef = useRef<TextInput>(null);

  const handleInvestUp = useCallback(async (data: InvestPropsRequest) => {
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

      const { name, mes, value, date } = data;

      const user = await AsyncStorage.getItem("@Financial:Id");

      const token = await AsyncStorage.getItem("@Financial:Token");
      console.log(token);

      const user_id = JSON.parse(user);

      api.defaults.headers.Authorization = `Baerer ${token}`;

      const invest = await api.post("/invest", {
        name,
        mes,
        value,
        date,
        user_id,
      });

      Alert.alert("Investimento cadastrado com sucesso");
    } catch (error) {
      Alert.alert("Erro ao cadastrar investimento");
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <ViewHeader>
            <Header>Cadastre seu Instimento </Header>
          </ViewHeader>
          <Form ref={formRef} onSubmit={handleInvestUp}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
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
                valueInputRef.current?.focus();
              }}
            />
            <Input
              ref={valueInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              name="value"
              icon="lock"
              placeholder="Valor"
              returnKeyType="next"
              onSubmitEditing={() => {
                dateInputRef.current?.focus();
              }}
            />
            <Input
              ref={dateInputRef}
              secureTextEntry
              name="date"
              icon="lock"
              placeholder="Data Compra"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default InvestUp;
