import styled from "styled-components/native";

import FeatherIcon from "react-native-vector-icons/Feather";

export const View = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  padding: 5px;
`;

export const Container = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 8px 20px;
  background-color: #312e38;
`;

export const Text = styled.Text`
  color: #fff;
  font-family: "RobotoSlab-Regular";
  font-size: 25px;
  align-items: center;
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 80px;
`;

export const ViewSelectInvest = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const TextSelectInvest = styled.Text`
  font-family: "RobotoSlab-Regular";
  font-size: 25px;
  color: #fff;
`;

export const Icon = styled(FeatherIcon)`
  color: white;
`;
