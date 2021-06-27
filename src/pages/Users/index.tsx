import React, { useCallback } from "react";
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
} from "./styles";

interface UserPropsCreate {
  name: string;
  email: string;
  password: string;
}

const Users: React.FC = () => {
  const navigation = useNavigation();

  const handleUserEdit = useCallback(async (data: UserPropsCreate) => {
    navigation.navigate("UsersCard");
  }, []);

  const handleUsersDelete = useCallback(async () => {}, []);

  return (
    <Container>
      <Image source={logoImg} />

      <Title>Perfil do Usuário</Title>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <Title>Selecione a opção desejada</Title>
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
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para Listagem</BackToSignInText>
      </BackToSignIn>
    </Container>
  );
};

export default Users;
