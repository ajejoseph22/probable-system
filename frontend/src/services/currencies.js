import axios from "axios";
import { apiUrl } from "../constants";

export const getCurrencies = async () => {
  return (await axios.get(`${apiUrl}/currencies`)).data;
};
