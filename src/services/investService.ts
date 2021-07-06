import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import api from "../libs/api";

export interface PropsInvest {
  name: string;
  mes: string;
  value: number;
  date: Date;
  user_id: string;
  amount: string;
}

export interface PropsToken {
  user_token: string;
}

export async function saveInvest({
  name,
  mes,
  value,
  date,
  amount,
}: PropsInvest) {
  try {
    const user = await AsyncStorage.getItem("@Financial:Id");
    const token = await AsyncStorage.getItem("@Financial:Token");
    const user_id = JSON.parse(user);

    console.log(name, mes, value, date, user_id);

    api.defaults.headers.Authorization = `Baerer ${token}`;

    const invest = await api.post("/invest", {
      name,
      mes,
      value,
      date,
      user_id,
      amount,
    });

    console.log(invest.data);
  } catch (error) {
    Alert.alert("Erro");
  }
}

export async function FindInvest() {
  try {
    const token = await AsyncStorage.getItem("@Financial:Token");
    api.defaults.headers.Authorization = `Baered ${token}`;
    const response = await api.get("invest");
    const resultsInvest = response.data;

    console.log(response.data);

    if (resultsInvest) {
      console.log(resultsInvest);
      return resultsInvest;
    }
  } catch (error) {
    Alert.alert("Erro");
  }
}
