import styled from "styled-components/native";
import FeatherIcon from "react-native-vector-icons/Feather";
export const Container = styled.View`
  flex: 1;
`;

export const ContainerInvestSelect = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #fff;
  margin-top: 40px;
  margin-left: 20px;
  align-items: center;
  border-radius: 10px;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: gray;
  font-family: "RobotoSlab-Regular";
  align-items: center;
  padding: 5px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: "RobotoSlab-Regular";
`;

export const ContainerButton = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 30px;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  height: 60px;
  border-radius: 10px;
`;

export const Icon = styled(FeatherIcon)`
  margin: 16px;
  flex-direction: row;
`;
