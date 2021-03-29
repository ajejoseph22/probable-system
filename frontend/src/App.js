import { useEffect, useState } from "react";
import { getCurrencies } from "./services/currencies";
import Spinner from "./components/spinner";
import "./App.css";
import ErrorPage from "./components/error-page";

function App() {
  const [currencies, setCurrencies] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrenciesAndSetState = async () => {
    try {
      setIsLoading(true);
      setCurrencies(await getCurrencies());
    } catch ({ message }) {
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCurrenciesAndSetState();
    })();
  }, []);

  if (isLoading) return <Spinner color="#000" />;

  if (error)
    return (
      <ErrorPage
        retryFunction={fetchCurrenciesAndSetState}
        message={error}
        color="#000"
      />
    );

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
