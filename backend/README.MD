# API

The API has 2 functional routes

* `/` - the index route
* `/exchange` - the exchange route. This route takes one query paramater (amount) in a `GET` request and returns the best
  BTC/USD deal available on major crypto brokers (Coinbase, Bitfinex, Binance)
  <br/><br/> Example request `http://localhost:4000/exchange?amount=1` <br/><br/> Example response <br/> ```{
  "btcAmount": 1,
  "usdAmount": 10000,
  "exchange": "coinbase"
  }```
