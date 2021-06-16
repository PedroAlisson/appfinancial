import React, { useRef, useCallback, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from "react-native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import Icon from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import logoImg from "../../../assets/logo.png";

import {
  Container,
  Title,
  Image,
  BackToSignIn,
  BackToSignInText,
  Button,
  Text,
  ViewUser,
} from "./styles";

import * as Yup from "yup";
import api from "../../../libs/api";
import Input from "../../Input";

interface UserPropsCreate {
  name: string;
  email: string;
  password: string;
}

const CardUsers: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  useEffect(() => {}, []);

  const handleSignUp = useCallback(async (data: UserPropsCreate) => {
    try {
      //const { name, email, password } = data;

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome Obrigatório"),
        email: Yup.string()
          .required("E-mail  obrigatiorio")
          .email("Digite um endereço de e-mail valido"),
        password: Yup.string().required("Senha Obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, password } = data;

      const users = await api.post("/users", {
        name,
        email,
        password,
      });

      Alert.alert("Usuário cadastrado com sucesso");
    } catch (error) {
      Alert.alert("Erro ao cadastrar usuário");
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
          <Image source={logoImg} />
          <View>
            <Title>Perfil do Usuário</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <ViewUser>
              <Button onPress={() => formRef.current?.submitForm()}>
                <Text> Alterar</Text>
              </Button>
              <Button onPress={() => formRef.current?.submitForm()}>
                <Text> Deletar</Text>
              </Button>
            </ViewUser>
          </Form>

          <BackToSignIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para Listagem</BackToSignInText>
          </BackToSignIn>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CardUsers;