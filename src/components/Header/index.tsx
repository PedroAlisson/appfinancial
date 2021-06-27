import React, { useCallback, useEffect, useState } from "react";

import {
  Container,
  Text,
  Image,
  ViewSelectInvest,
  TextSelectInvest,
} from "./styles";
import ImageAvatar from "../../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

const Header: React.FC = ({ children, ...rest }) => {
  const [data, setData] = useState([]);

  const navigation = useNavigation();

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

  const handleUser = useCallback(() => {
    navigation.navigate("Users");
  }, []);

  return (
    <View>
      <Container {...rest}>
        <Text>Ola, {data} </Text>
        <TouchableOpacity onPress={handleUser}>
          <Image source={ImageAvatar} />
        </TouchableOpacity>
      </Container>
      <ViewSelectInvest>
        <TextSelectInvest>{children}</TextSelectInvest>
      </ViewSelectInvest>
    </View>
  );
};

export default Header;
