import CryptoExchange from "../types/crypto-exchange";
import axios from "axios";
import { coinbaseApiUrl } from "../util/constants";
import { Symbol } from "../enum/symbol";
import { CoinBaseOrders } from "../types/order";

class CoinbasePrime implements CryptoExchange {
  readonly name = "Coinbase Prime";

  async getOrderBooks(symbol: Symbol): Promise<CoinBaseOrders> {
    return (
      await axios.get(`${coinbaseApiUrl}/products/${symbol}/book?level=2`)
    ).data;
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

export default CoinbasePrime;
