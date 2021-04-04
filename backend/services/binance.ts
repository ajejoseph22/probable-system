import CryptoExchange from "../types/crypto-exchange";
import axios from "axios";
import { binanceApiUrl } from "../util/constants";
import { Symbol } from "../enum/symbol";
import { BinanceOrders } from "../types/order";

class Binance implements CryptoExchange {
  readonly name = "Binance";

  async getOrderBooks(symbol: Symbol): Promise<BinanceOrders> {
    return (await axios.get(`${binanceApiUrl}/api/v3/depth?symbol=${symbol}`))
      .data;
  }

  async getBestBuyPrice(
    amount: number,
    symbol: Symbol
  ): Promise<number | undefined> {
    const orders = await this.getOrderBooks(symbol);

    const askOrdersMatchingAmount = orders.asks.filter(
      (item) => +item[1] >= amount
    );

    if (askOrdersMatchingAmount[0] && askOrdersMatchingAmount[0][0]) {
      return +askOrdersMatchingAmount[0][0];
    }
  }
}

export default Binance;
