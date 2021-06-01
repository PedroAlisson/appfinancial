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
import { View } from "react-native";

const Header: React.FC = ({ children, ...rest }) => {
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

  return (
    <View>
      <Container {...rest}>
        <Text>Olá, {data} </Text>
        <Image source={ImageAvatar} />
      </Container>
      <ViewSelectInvest>
        <TextSelectInvest>{children}</TextSelectInvest>
      </ViewSelectInvest>
    </View>
  );
};

export default Header;
