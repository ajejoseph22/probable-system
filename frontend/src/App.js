import { useEffect, useState } from "react";
import { getCurrencies } from "./services/currencies";
import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState();

  useEffect(() => {
    (async () => {
      try {
        setCurrencies(await getCurrencies());
      } catch ({ message }) {
      } finally {
      }
    })();
  }, []);

  return (
    <div id="app">
      <header>CURRENCIES</header>
      <div id="currencies">
        {(currencies || []).map(({ name }) => (
          <div className="currency">{name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
