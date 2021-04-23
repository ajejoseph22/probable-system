import axios from "axios";
import { Service } from 'typedi';

import CryptoExchange from "../types/crypto-exchange";
import { BitfinexOrders } from "../types/order";
import { bitfinexApiUrl, exchangeToken } from "../util/constants";
import { Symbol } from "../enum/symbol";

@Service({ id: exchangeToken, multiple: true })
export default class Bitfinex extends CryptoExchange {
  readonly name = "Bitfinex";
  private symbol = Symbol.Bitfinex_BitcoinUsd;

  async getOrderBooks(): Promise<BitfinexOrders> {
    return (await axios.get(`${bitfinexApiUrl}/v2/book/${this.symbol}/P1`)).data;
  }

  async getBestBuyPrice(amount: number): Promise<number | undefined> {
    const orders = await this.getOrderBooks();
    const askOrders = orders.filter((item) => item[2] < 0);
    const ordersMatchingAmount = askOrders.filter(
      (item) => Math.abs(item[2]) >= amount
    );

    return ordersMatchingAmount[0] && ordersMatchingAmount[0][0];
  }
}

