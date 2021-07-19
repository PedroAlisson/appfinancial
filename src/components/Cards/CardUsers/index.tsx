import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from "react-native";

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

import api from "../../../libs/api";
import Input from "../../Input";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

interface UserPropsUpdate {
  name: string;
  email: string;
  password: string;
}

interface Params {
  users: Object;
}

const CardUsers: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [user, setUser] = useState<UserPropsUpdate>({});

  useEffect(() => {
    async function findUser() {
      const token = await AsyncStorage.getItem("@Financial:Token");
      api.defaults.headers.Authorization = `Baered ${token}`;
      const users = await api.get("users");

      const resultsUser = users.data;

      if (resultsUser) {
        setUser(resultsUser);
      }
      return;
    }
    findUser();
  }, []);

  const handleUserAlter = useCallback(async (data: InvestPropsAlterRequest) => {
    try {
      const { name, email, password } = data;
      console.log("Dados: ", name, email, password);
      const user_id = await AsyncStorage.getItem("@Financial:Id");
      const id = JSON.parse(user_id);

      const users = await api.put(`users/${id}`, {
        name,
        email,
        password,
      });

      Alert.alert("Usuário Alterado com sucesso");
    } catch (error) {
      Alert.alert("Erro ao Alterar usuário");
    }
    UpdateUser();
  }, []);

  const handleUsersDelete = useCallback(async () => {
    const user_id = await AsyncStorage.getItem("@Financial:Id");
    const id = JSON.parse(user_id);
    const users = await api.delete(`users/${id}`);
    //console.log(users);
    Alert.alert("Usuário deletado");
    navigation.navigate("SignIn");
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
              <Title>Perfil do Usuário</Title>
            </View>
            <Form ref={formRef} onSubmit={handleUserAlter}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                defaultValue={user.name}
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
                defaultValue={user.email}
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
                defaultValue={user.password}
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <ViewUser>
                <Button
                  style={{ backgroundColor: "orange" }}
                  onPress={() => formRef.current?.submitForm()}
                >
                  <Icon name="edit-2" size={20} color="#fff">
                    <Text>Alterar</Text>
                  </Icon>
                </Button>
                <Button
                  style={{ backgroundColor: "red" }}
                  onPress={handleUsersDelete}
                >
                  <Icon name="trash" size={20} color="#fff">
                    <Text> Deletar</Text>
                  </Icon>
                </Button>
              </ViewUser>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CardUsers;
