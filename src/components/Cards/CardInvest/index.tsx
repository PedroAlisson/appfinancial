import React from "react";
import { SelectView, TextInvest, ViewContainer } from "./styles";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { format } from "date-fns";

interface selectPropsInvest extends RectButtonProps {
  data: { id: string; name: string; mes: string; value: number; date: Date };
}

const CardInvest: React.FC<selectPropsInvest> = ({ data, ...rest }) => {
  return (
    <RectButton {...rest}>
      <SelectView>
        <ViewContainer>
          <TextInvest>Nome: {data.name}</TextInvest>
          <TextInvest>
            Data: {format(new Date(data.date), "MM/dd/yyy")}
          </TextInvest>
          <TextInvest>Mês: {data.mes}</TextInvest>
          <TextInvest>Quantidade: {data.amount}</TextInvest>
          <TextInvest>Valor: {data.value}</TextInvest>
        </ViewContainer>
      </SelectView>
    </RectButton>
  );
};

export default CardInvest;
