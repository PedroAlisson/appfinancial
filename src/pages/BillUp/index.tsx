import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useRef } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import api from "../../libs/api";

import { Container } from "./style";

interface BillPropsRequest {
  name: string;
  date: Date;
  status: string;
  value: number;
  mes: string;
}

const BillUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const name = useRef<TextInput>(null);
  const date = useRef<TextInput>(null);
  const status = useRef<TextInput>(null);
  const value = useRef<TextInput>(null);
  const mes = useRef<TextInput>(null);

  const handleBillUp = useCallback(
    async (data: BillPropsRequest, { reset }) => {
      try {
        const { name, date, status, value, mes } = data;

        const bill = await api.post("/bills", {
          name,
          date,
          status,
          value,
          mes,
        });
        Alert.alert("Conta castrada com sucesso");
        reset();
        return;
      } catch (error) {
        Alert.alert(error);
        return;
      }
    },
    []
  );

  return (
    <Container>
      <Header>Cadastre suas despesas </Header>
      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <Form ref={formRef} onSubmit={handleBillUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="info"
                placeholder="Nome da Conta"
                returnKeyType="next"
                onSubmitEditing={() => {
                  date.current?.focus();
                }}
              />
              <Input
                ref={date}
                autoCorrect={false}
                autoCapitalize="none"
                name="date"
                icon="calendar"
                placeholder="12/06/1997"
                returnKeyType="next"
                onSubmitEditing={() => {
                  status.current?.focus();
                }}
              />
              <Input
                ref={status}
                autoCorrect={false}
                autoCapitalize="none"
                name="status"
                icon="info"
                placeholder="Pago"
                returnKeyType="next"
                onSubmitEditing={() => {
                  value.current?.focus();
                }}
              />
              <Input
                ref={value}
                autoCorrect={false}
                autoCapitalize="none"
                name="value"
                icon="dollar-sign"
                placeholder="Valor"
                returnKeyType="next"
                onSubmitEditing={() => {
                  value.current?.focus();
                }}
              />
              <Input
                ref={mes}
                name="mes"
                icon="calendar"
                placeholder="Junho"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar Despesas
              </Button>
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </Container>
  );
};

export default BillUp;
