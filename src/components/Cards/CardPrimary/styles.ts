import styled from "styled-components/native";
export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ContainerInvestSelect = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #fff;
  margin-top: 50px;
  align-items: center;
  border-radius: 30px;
`;

export const Text = styled.Text`
  font-size: 20px;
  line-height: 40px;
  font-family: "RobotoSlab-Regular";
`;
export const ContainerButton = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 30px;
`;

export const ButtonAlter = styled.TouchableOpacity`
  align-items: center;
  padding: 20px;
  background-color: orange;
  border-radius: 25px;
  width: 45%;
`;

export const ButtonExcl = styled.TouchableOpacity`
  align-items: center;
  padding: 20px;
  background-color: red;
  border-radius: 25px;
  width: 45%;
`;
