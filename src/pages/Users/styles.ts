import styled from "styled-components/native";
import { Platform } from "react-native";

import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 120 : 40}px;
`;

export const Title = styled.Text`
  margin-bottom: 30px;
  font-size: 24px;
  color: #f4ede8;
  font-family: "RobotoSlab-Medium";
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 70px;
  margin-bottom: 20px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0 ${16 + getBottomSpace()}px;
`;

export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: "RobotoSlab-Regular";
  margin-left: 16px;
`;

export const Button = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 20px;
  align-items: center;
  margin-right: 5px;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 15px;
  font-family: "RobotoSlab-Regular";
`;

export const ViewUser = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
`;
