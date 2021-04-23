import Container from "typedi";
import { Request, Response } from "express";
import { SuccessResponse } from "../types/success-response";
import { CryptoWrapper } from "../services/crypto-exchange-wrapper";

const cryptoWrapper = Container.get(CryptoWrapper);

const validate = (amount?: number) => {
  if (amount === undefined) throw new Error("Amount is required");

  if (!amount) throw new Error("Amount must be greater than 0");
};

export default async (req: Request, res: Response) => {
  const { amount } = req.query;
  const amountInNumber = amount ? +amount : undefined;

  try {
    validate(amountInNumber);
    console.log('How far');
    console.log('LINE 20', cryptoWrapper);
    
    const { exchange, price } = await cryptoWrapper.getBestBuyPrices(amountInNumber as number);

    res.json({
      exchange,
      btcAmount: amountInNumber,
      usdAmount: price,
    } as SuccessResponse);
  } catch ({ message }) {
    console.log(message);
    res.status(400).json(message);
  }
};
