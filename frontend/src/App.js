import { useEffect, useState } from "react";
import { getCurrencies } from "./services/currencies";
import Spinner from "./components/spinner";
import ErrorPage from "./components/error-page";
import { Switch } from "antd";
import { shuffleArray, sortByAscending } from "./util/methods";

import "./App.css";
import "react-toggle/style.css";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [
    isDisplayingUsSupportedOnly,
    setIsDisplayingUsSupportedOnly,
  ] = useState(false);
  const [isTestModeOnly, setIsTestModeOnly] = useState(false);

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
    let currenciesFiltered = currencies || [];

    if (isDisplayingUsSupportedOnly) {
      currenciesFiltered = currenciesFiltered.filter(
        (currency) => currency.isSupportedInUS
      );
    }

    if (isTestModeOnly) {
      currenciesFiltered = currenciesFiltered.filter(
        (currency) => currency.supportsTestMode
      );
    }

    setFilteredCurrencies(currenciesFiltered);
  }, [currencies, isDisplayingUsSupportedOnly, isTestModeOnly]);

  useEffect(() => {
    (async () => {
      await fetchCurrenciesAndSetState();
    })();
  }, []);

  const handleOnChangeUsSupportedOnly = () => {
    setIsDisplayingUsSupportedOnly((prevState) => !prevState);
  };

  const handleOnChangeTestModeOnly = () => {
    setIsTestModeOnly((prevState) => !prevState);
  };

  const sortByNameAscending = () => {
    setFilteredCurrencies(
      [...filteredCurrencies].sort((first, second) =>
        sortByAscending(first.name, second.name)
      )
    );
  };

  const sortBySymbolAscending = () => {
    setFilteredCurrencies(
      [...filteredCurrencies].sort((first, second) =>
        sortByAscending(first.code, second.code)
      )
    );
  };

  const shuffle = () => {
    setFilteredCurrencies((prevState) => shuffleArray(prevState));
  };

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
      <div id="controls">
        <Switch
          className="control-item"
          checkedChildren="Show only US supported"
          unCheckedChildren="Include non US supported"
          onChange={handleOnChangeUsSupportedOnly}
        />

        <Switch
          className="control-item"
          checkedChildren="Test mode only"
          unCheckedChildren="Include non test mode"
          onChange={handleOnChangeTestModeOnly}
        />

        <button onClick={sortByNameAscending} className="control-item">
          Sort by Ascending (name)
        </button>
        <button onClick={sortBySymbolAscending} className="control-item">
          Sort by Ascending (symbol)
        </button>
        <button onClick={shuffle} className="control-item">
          Shuffle
        </button>
      </div>

      <header>CURRENCIES</header>
      <div id="currencies">
        {filteredCurrencies.map(({ name, id }) => (
          <div key={id} className="currency">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
