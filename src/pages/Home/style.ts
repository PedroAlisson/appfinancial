import styled from "styled-components/native";
import FeatherIcon from "react-native-vector-icons/Feather";

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  width: 120px;
  height: 80px;
  background-color: gray;
  border-radius: 20px;
  margin-left: 10px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const ContainerMenu = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-family: "RobotoSlab-Regular";
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  align-items: center;
`;

export const Icon = styled(FeatherIcon)`
  flex-direction: row;
  text-align: center;
  margin-top: 20px;
  color: black;
  background-color: gold;
  border-radius: 10px;
`;

export const Image = styled.Image`
  width: 100%;
  background-color: red;
  border-radius: 50px;
  padding-right: 20px;
`;
