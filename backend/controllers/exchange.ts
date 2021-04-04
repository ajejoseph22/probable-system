import { Request, Response } from "express";
import { Symbol } from "../enum/symbol";
import Binance from "../services/binance";
import CoinbasePrime from "../services/coinbase-prime";
import Bitfinex from "../services/bitfinex";
import { SuccessResponse } from "../types/success-response";

const binance = new Binance();
const coinbase = new CoinbasePrime();
const bitfinex = new Bitfinex();

const validate = (amount?: number) => {
  if (amount === undefined) throw new Error("Amount is required");

  if (!amount) throw new Error("Amount must be greater than 0");
};

const computeBestPrice = (bestPrices: {
  [key: string]: number | undefined;
}): number => {
  const pricesExcludingUndefined = Object.values(bestPrices).filter(
    (price) => price
  ) as number[];

  if (!pricesExcludingUndefined.length)
    throw new Error(
      "None of our supported exchanges can support your order right now"
    );

  return Math.min(...pricesExcludingUndefined);
};

export default async (req: Request, res: Response) => {
  const { amount } = req.query;
  const amountInNumber = amount ? +amount : undefined;

  try {
    validate(amountInNumber);

    const [
      binanceBestBuyPrice,
      coinBaseBestBuyPrice,
      bitfinexBestBuyPrice,
    ] = await Promise.all([
      binance.getBestBuyPrice(
        amountInNumber as number,
        Symbol.Binance_BitcoinUsd
      ),
      coinbase.getBestBuyPrice(
        amountInNumber as number,
        Symbol.CoinBase_BitcoinUsd
      ),
      bitfinex.getBestBuyPrice(
        amountInNumber as number,
        Symbol.Bitfinex_BitcoinUsd
      ),
    ]);

    const bestPrice = computeBestPrice({
      binanceBestBuyPrice,
      coinBaseBestBuyPrice,
      bitfinexBestBuyPrice,
    });

    let exchange;
    switch (bestPrice) {
      case binanceBestBuyPrice:
        exchange = binance.name;
        break;
      case coinBaseBestBuyPrice:
        exchange = coinbase.name;
        break;
      case bitfinexBestBuyPrice:
        exchange = bitfinex.name;
        break;
      default:
        throw new Error("Price does not match any exchange");
    }

    res.json({
      exchange,
      btcAmount: amountInNumber,
      usdAmount: bestPrice,
    } as SuccessResponse);
  } catch ({ message }) {
    console.log(message);
    res.status(400).json(message);
  }
};
