import { format } from "date-fns";
import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { ViewContainer, TextInvest, Container } from "./styles";

interface selectPropsBill extends RectButtonProps {
  data: {
    name: string;
    mes: string;
    status: string;
    value: number;
    date: Date;
  };
}

const CardBill: React.FC<selectPropsBill> = ({ data, ...rest }) => {
  return (
    <RectButton {...rest}>
      <Container>
        <ViewContainer>
          <TextInvest>Nome: {data.name}</TextInvest>
          <TextInvest>
            Data: {format(new Date(data.date), "MM/dd/yyy")}
          </TextInvest>
          <TextInvest>Mês: {data.mes}</TextInvest>
          <TextInvest>Status: {data.status}</TextInvest>
          <TextInvest>Valor: {data.value}</TextInvest>
        </ViewContainer>
      </Container>
    </RectButton>
  );
};

export default CardBill;
