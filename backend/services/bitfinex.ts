import CryptoExchange from "../types/crypto-exchange";
import { BitfinexOrders } from "../types/order";
import axios from "axios";
import { bitfinexApiUrl } from "../util/constants";
import { Symbol } from "../enum/symbol";

class Bitfinex implements CryptoExchange {
  readonly name = "Bitfinex";

  async getOrderBooks(symbol: Symbol): Promise<BitfinexOrders> {
    return (await axios.get(`${bitfinexApiUrl}/v2/book/${symbol}/P1`)).data;
  }

  async getBestBuyPrice(
    amount: number,
    symbol: Symbol
  ): Promise<number | undefined> {
    const orders = await this.getOrderBooks(symbol);
    const askOrders = orders.filter((item) => item[2] < 0);
    const ordersMatchingAmount = askOrders.filter(
      (item) => Math.abs(item[2]) >= amount
    );

    return ordersMatchingAmount[0] && ordersMatchingAmount[0][0];
  }
}

export default Bitfinex;
