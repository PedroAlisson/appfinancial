import React, { useCallback, useEffect, useState } from "react";

import {
  Container,
  Text,
  View,
  ViewSelectInvest,
  TextSelectInvest,
  Icon,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const HeaderBack: React.FC = ({ children, ...rest }) => {
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
        <Text>Olaaaa, {data} </Text>
        <TouchableOpacity onPress={handleUser}>
          <Icon name="arrow-left" size={40} color="#fff"></Icon>
        </TouchableOpacity>
      </Container>
      <ViewSelectInvest>
        <TextSelectInvest>{children}</TextSelectInvest>
      </ViewSelectInvest>
    </View>
  );
};

export default HeaderBack;
