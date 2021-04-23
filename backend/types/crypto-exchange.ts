import { BinanceOrders, BitfinexOrders, CoinBaseOrders } from "./order";

type Orders = BitfinexOrders | CoinBaseOrders | BinanceOrders;

export default abstract class CryptoExchange {
  abstract name: string;
  abstract getOrderBooks(): Promise<Orders>;
  abstract getBestBuyPrice(amount: number): Promise<number | undefined>;
}
