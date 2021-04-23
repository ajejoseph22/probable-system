import Container, { Service } from "typedi";
import CryptoExchange from "../types/crypto-exchange";
import { exchangeToken } from "../util/constants";

@Service()
export class CryptoWrapper {
  private cryptoExchanges: CryptoExchange[];

  constructor() {
    this.cryptoExchanges = Container.getMany(exchangeToken);
    console.log(Container.getMany(exchangeToken));
  }

  private computeBestPrice(bestPrices: number[]): number {
    if (!bestPrices.length)
      throw new Error(
        "None of our supported exchanges can support your order right now"
      );

    return Math.min(...bestPrices);
  };

  async getBestBuyPrices(amount: number) {
    console.log('amount', amount);

    const exchangeNames = this.cryptoExchanges.map(exchange => exchange.name);
    const bestPrices = await Promise.all(this.cryptoExchanges.map(exchange => exchange.getBestBuyPrice(amount)));

    const exchangeBestPricesMap = bestPrices.reduce<Record<string, number>>(
      (exchangePriceMap, price, index) => {
        if (!!price) {
          exchangePriceMap[exchangeNames[index]] = price;
        }
        return exchangePriceMap;
      }, {});

    const computedBestPrice = this.computeBestPrice(Object.values(exchangeBestPricesMap));

    const bestPrice = Object.entries(exchangeBestPricesMap).find(([_, price]) => price === computedBestPrice);

    if (!bestPrice) {
      throw new Error("Price does not match any exchange");
    }

    return { exchange: bestPrice[0], price: bestPrice[1] };
  }
}