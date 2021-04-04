import { BinanceOrders, BitfinexOrders, CoinBaseOrders } from "./order";
import { Symbol } from "../enum/symbol";

type Orders = BitfinexOrders | CoinBaseOrders | BinanceOrders;

export default interface CryptoExchange {
  name: string;
  getOrderBooks: (symbol: Symbol) => Promise<Orders>;
  getBestBuyPrice: (
    amount: number,
    symbol: Symbol
  ) => Promise<number | undefined>;
}
