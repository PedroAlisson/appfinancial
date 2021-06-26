import React, { useRef, useCallback } from "react";
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
import logoImg from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  Container,
  Title,
  Image,
  BackToSignIn,
  BackToSignInText,
} from "./styles";
import api from "../../libs/api";
import * as Yup from "yup";

interface UserPropsCreate {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

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

      //   await schema.validate(data, {
      //     abortEarly: false,
      //   });

      const { name, email, password } = data;

      const users = await api.post("/users", {
        name,
        email,
        password,
      });

      console.log(users);

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
            <Title>Crie sua Conta</Title>
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
            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Form>

          <BackToSignIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
          </BackToSignIn>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
