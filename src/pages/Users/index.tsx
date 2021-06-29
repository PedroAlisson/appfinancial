import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import logoImg from "../../assets/logo.png";

import {
  Container,
  Title,
  Image,
  BackToSignIn,
  BackToSignInText,
  Button,
  Text,
  ViewUser,
  TextUser,
  ViewLogOut,
} from "./styles";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";

interface UserPropsCreate {
  name: string;
  email: string;
  password: string;
}

const Users: React.FC = ({ children, ...rest }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = await AsyncStorage.getItem("@Financial:Token");
      const id = await AsyncStorage.getItem("@Financial:Id");
      const name = await AsyncStorage.getItem("@Financial:Name");
      if (token && id && name) {
        setData(JSON.parse(name));
      }
    }

    loadStorageData();
  }, []);

  const navigation = useNavigation();

  const handleUserEdit = useCallback(async (data: UserPropsCreate) => {
    navigation.navigate("UsersCard");
  }, []);

  const handleUsersLogout = useCallback(async ({ ...rest }) => {
    await AsyncStorage.multiRemove([
      "@Financial:Token",
      "@Financial:Id",
      "@Financial:Name",
    ]);

    navigation.navigate("SignIn");
  }, []);

  const handleUsersDelete = useCallback(async () => {}, []);

  return (
    <Container {...rest}>
      <Image source={logoImg} />
      <TextUser>{data} </TextUser>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled" horizontal={true}>
          <ViewUser>
            <Button
              style={{ backgroundColor: "orange" }}
              onPress={handleUserEdit}
            >
              <Icon name="edit" size={20} color="#fff">
                <Text>Informações</Text>
              </Icon>
            </Button>
            <Button
              style={{ backgroundColor: "orange" }}
              onPress={() => formRef.current?.submitForm()}
            >
              <Icon name="edit-2" size={20} color="#fff">
                <Text>Foto</Text>
              </Icon>
            </Button>
            <Button
              style={{ backgroundColor: "red" }}
              onPress={handleUsersDelete}
            >
              <Icon name="tool" size={20} color="#fff">
                <Text>Configurações</Text>
              </Icon>
            </Button>
          </ViewUser>
        </ScrollView>
      </KeyboardAvoidingView>
      <ViewLogOut>
        <Button
          style={{ backgroundColor: "#6495ED" }}
          onPress={handleUsersLogout}
        >
          <Icon name="log-out" size={20} color="black">
            <Text>Sair</Text>
          </Icon>
        </Button>
      </ViewLogOut>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para Listagem</BackToSignInText>
      </BackToSignIn>
    </Container>
  );
};

export default Users;
