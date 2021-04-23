import { Token } from 'typedi';
import CryptoExchange from '../types/crypto-exchange';

export const binanceApiUrl = "https://api.binance.com";
export const coinbaseApiUrl = "https://api.prime.coinbase.com";
export const bitfinexApiUrl = "https://api-pub.bitfinex.com";
export const exchangeToken = new Token<CryptoExchange>('CRYPTO_EXCHANGE')