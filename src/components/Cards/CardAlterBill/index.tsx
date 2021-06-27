import React, { useCallback, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import api from "../../../libs/api";
import Header from "../../Header";

import { Container, ViewHeader } from "./styles";
import { FormHandles } from "@unform/core";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as Yup from "yup";
import Input from "../../Input";
import Button from "../../Button";
import { Form } from "@unform/mobile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

interface Params {
  invest: Object;
}

interface InvestPropsAlterRequest {
  name: string;
  mes: string;
  value: number;
  date: Date;
  user_id: string;
}
const CardBillAlter: React.FC = () => {
  const route = useRoute();
  const navigate = useNavigation();
  const { bill } = route.params as Params;
  const id = bill.id;
  const formRef = useRef<FormHandles>(null);
  const name = useRef<TextInput>(null);
  const date = useRef<TextInput>(null);
  const status = useRef<TextInput>(null);
  const value = useRef<TextInput>(null);
  const mes = useRef<TextInput>(null);

  const handleBilltAlter = useCallback(
    async (data: InvestPropsAlterRequest) => {
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

        const user_id = JSON.parse(user);

        api.defaults.headers.Authorization = `Baerer ${token}`;

        const bill = await api.put(`/bills/${id}`, {
          name,
          mes,
          value,
          date,
          user_id,
        });

        Alert.alert("Despesas Alterada com sucesso");
      } catch (error) {
        Alert.alert("Erro ao Alterar Despesas");
      }
    },
    []
  );

  return (
    <>
      <ViewHeader>
        <Header>Altere suas Depesas </Header>
      </ViewHeader>

      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <Form ref={formRef} onSubmit={handleBilltAlter}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="info"
                defaultValue={bill.name}
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
                defaultValue={format(new Date(bill.date), "MM/dd/yyy")}
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
                defaultValue={bill.status}
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
                defaultValue={bill.value}
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
                defaultValue={bill.mes}
                icon="calendar"
                placeholder="Junho"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Alterar Despesas
              </Button>
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
};
export default CardBillAlter;
