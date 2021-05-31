import React, { useCallback, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from "react-native";
import logoImg from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/Feather";
import {
  Container,
  Title,
  Image,
  CreateAccountButton,
  CreateAccountText,
} from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../libs/api";

interface UserPropsAuth {
  email: string;
  password: string;
}

interface UserStorageAsync {
  id: string;
  name: string;
  toke: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const [data, setData] = useState();
  const handleSignIn = useCallback(async (data: UserPropsAuth) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha Obrigatoria"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      const login = await api.post("/sessions", {
        email,
        password,
      });
      const {
        token,
        user: { id, name },
      } = login.data;

      try {
        await AsyncStorage.multiSet([
          ["@Financial:Token", token],
          ["@Financial:Id", JSON.stringify(id)],
          ["@Financial:Name", JSON.stringify(name)],
        ]);
        setData(token);
      } catch (error) {
        console.log(error);
      }

      navigation.navigate("Invest");
    } catch (error) {
      Alert.alert(error);
    }
  }, []);

  return (
    <>
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
              <Title>Faça seu Logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
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
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>

            <CreateAccountButton onPress={() => navigation.navigate("SignUp")}>
              <Icon name="log-in" size={20} color="#ff9000" />
              <CreateAccountText>Criar Conta</CreateAccountText>
            </CreateAccountButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
