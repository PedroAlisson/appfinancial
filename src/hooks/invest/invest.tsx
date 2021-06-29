import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

import { SelectView, TextInvest, ViewContainer } from "./styles";

import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import api from "../../libs/api";

interface selectPropsInvest extends RectButtonProps {
  data: { id: string; name: string; mes: string; value: number; date: Date };
}

const InvestProvider: React.FC<selectPropsInvest> = ({ data, ...rest }) => {
  const [invest, setInvest] = useState([]);

  useEffect(() => {
    async function findInvest(): Promise<void> {
      const token = await AsyncStorage.getItem("@Financial:Token");

      api.defaults.headers.Authorization = `Baered ${token}`;
      const res = await api.get("invest");
      const resultsInvest = res.data;

      if (resultsInvest) {
        setInvest(resultsInvest);
      }
      return;
    }
    findInvest();
    return;
  }, []);

  return (
    <RectButton {...rest}>
      <SelectView>
        <ViewContainer>
          <TextInvest>Nome: {data.name}</TextInvest>
          <TextInvest>
            Data: {format(new Date(data.date), "MM/dd/yyy")}
          </TextInvest>
          <TextInvest>Mês: {data.mes}</TextInvest>
          <TextInvest>Valor: {data.value}</TextInvest>
        </ViewContainer>
      </SelectView>
    </RectButton>
  );
};

export { InvestProvider };
