import axios from "axios";
import { Service } from "typedi";

import CryptoExchange from "../types/crypto-exchange";
import { coinbaseApiUrl, exchangeToken } from "../util/constants";
import { Symbol } from "../enum/symbol";
import { CoinBaseOrders } from "../types/order";

@Service({ id: exchangeToken, multiple: true })
export default class CoinbasePrime extends CryptoExchange {
  readonly name = "Coinbase";
  private symbol = Symbol.CoinBase_BitcoinUsd;

  async getOrderBooks(): Promise<CoinBaseOrders> {
    return (
      await axios.get(`${coinbaseApiUrl}/products/${this.symbol}/book?level=2`)
    ).data;
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
