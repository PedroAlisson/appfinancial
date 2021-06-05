import React from "react";
import { SelectView, TextInvest } from "./styles";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface selectPropsInvest extends RectButtonProps {
  data: { id: string; name: string; mes: string; value: number; date: Date };
}

const CardInvest: React.FC<selectPropsInvest> = ({ data, ...rest }) => {
  return (
    <RectButton {...rest}>
      <SelectView>
        <TextInvest>Nome: {data.name}</TextInvest>
        <TextInvest>Data: {data.date}</TextInvest>
        <TextInvest>Mês: {data.mes}</TextInvest>
        <TextInvest>Valor: {data.value}</TextInvest>
      </SelectView>
    </RectButton>
  );
};

export default CardInvest;
