import { useNavigation } from "@react-navigation/core";
import React, { Children } from "react";
import { RectButtonProperties } from "react-native-gesture-handler";
import Header from "../../components/Header";
import { TouchableOpacity, Text, ContainerMenu, Icon } from "./style";

interface RectProps extends RectButtonProperties {}

const Home: React.FC<RectProps> = ({ title, ...rest }) => {
  const navigation = useNavigation();
  return (
    <>
      <Header></Header>
      <ContainerMenu>
        <TouchableOpacity>
          <Icon name="arrow-left" size={25} color="#fff"></Icon>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Invest")}>
          <Icon name="dollar-sign" size={25} color="#fff"></Icon>
          <Text>Investimentos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Bill")}>
          <Icon name="dollar-sign" size={25} color="#fff"></Icon>
          <Text>Contas</Text>
        </TouchableOpacity>
      </ContainerMenu>
    </>
  );
};

export default Home;
