import styled from "styled-components/native";
import FeatherIcon from "react-native-vector-icons/Feather";

export const Container = styled.View`
  flex: 1;
`;

export const Card = styled.View`
  background-color: white;
  width: 90%;
  margin-left: 15px;
  margin-bottom: 30px;
  border-radius: 10px;
`;

export const CardHome = styled.View`
  padding: 15px;
`;

export const Text = styled.Text`
  font-size: 20px;
  padding: 5px;
  text-align: center;
  font-family: "RobotoSlab-Medium";
`;

export const TextInformation = styled.Text`
  font-size: 18px;
  padding: 5px;
  font-family: "RobotoSlab-Regular";
  margin-top: 10px;
`;

export const Icon = styled(FeatherIcon)`
  margin-top: 20px;
  width: 50px;
  color: black;
  background-color: gold;
  border-radius: 5px;
`;

export const TextButton = styled.Text`
  color: blue;
  align-items: center;
  margin-top: 5px;
  font-size: 20px;
  font-family: "RobotoSlab-Medium";
`;

export const TouchableOpacity = styled.TouchableOpacity`
  border-radius: 10px;
  margin-right: 2px;
  width: 150px;
  height: 40px;
  margin-top: 10px;
  border: 2px;
  border-color: blue;
  align-items: center;
  background-color: white;
`;
