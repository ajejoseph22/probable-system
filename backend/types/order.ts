export type BitfinexOrders = [price: number, count: number, amount: number][];

type CoinBaseOrder = [price: string, size: string, count: number]

export type CoinBaseOrders = {
    asks: CoinBaseOrder[];
    bids: CoinBaseOrder[];
};

type BinanceOrder = [price: string, size: string]

export type BinanceOrders = {
    lastUpdateId: number;
    asks: BinanceOrder[];
    bids: BinanceOrder[];
};
