import { Exchange } from "../enum/exchange";

export interface SuccessResponse {
  exchange: Exchange;
  btcAmount: number;
  usdAmount: number;
}
