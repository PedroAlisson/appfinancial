import { format } from "date-fns";
import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { ViewContainer, TextBill, SelectView } from "./styles";

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
      <SelectView>
        <ViewContainer>
          <TextBill>Nome: {data.name}</TextBill>
          <TextBill>Data: {format(new Date(data.date), "MM/dd/yyy")}</TextBill>
          <TextBill>Mês: {data.mes}</TextBill>
          <TextBill>Status: {data.status}</TextBill>
          <TextBill>Valor: {data.value}</TextBill>
        </ViewContainer>
      </SelectView>
    </RectButton>
  );
};

export default CardBill;
