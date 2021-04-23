import axios from "axios";
import { Service } from 'typedi';

import CryptoExchange from "../types/crypto-exchange";
import { binanceApiUrl, exchangeToken } from "../util/constants";
import { Symbol } from "../enum/symbol";
import { BinanceOrders } from "../types/order";

@Service({ id: exchangeToken, multiple: true })
export default class Binance extends CryptoExchange {
  readonly name = "Binance";
  private readonly symbol = Symbol.Binance_BitcoinUsd;

  async getOrderBooks(): Promise<BinanceOrders> {
    return (await axios.get(`${binanceApiUrl}/api/v3/depth?symbol=${this.symbol}`))
      .data;
  }

  async getBestBuyPrice(amount: number): Promise<number | undefined> {
    const orders = await this.getOrderBooks();

    const askOrdersMatchingAmount = orders.asks.filter(
      (item) => +item[1] >= amount
    );

    if (askOrdersMatchingAmount[0] && askOrdersMatchingAmount[0][0]) {
      return +askOrdersMatchingAmount[0][0];
    }
  }
}
