import { useEffect, useState, useMemo } from "react";
import { getCurrencies } from "./services/currencies";
import Spinner from "./components/spinner";
import ErrorPage from "./components/error-page";
import { Switch } from "antd";
import "./App.css";
import "react-toggle/style.css";

function App() {
  const [currencies, setCurrencies] = useState();
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

  const filteredCurrencies = useMemo(() => {
    let currenciesToFilter = currencies || [];

    if (isDisplayingUsSupportedOnly) {
      currenciesToFilter = currenciesToFilter.filter(
        (currency) => currency.isSupportedInUS
      );
    }

    if (isTestModeOnly) {
      currenciesToFilter = currenciesToFilter.filter(
        (currency) => currency.supportsTestMode
      );
    }

    return currenciesToFilter;
  }, [currencies, isDisplayingUsSupportedOnly, isTestModeOnly]);

  const handleOnChangeUsSupportedOnly = () => {
    setIsDisplayingUsSupportedOnly((prevState) => !prevState);
  };

  const handleOnChangeTestModeOnly = () => {
    setIsTestModeOnly((prevState) => !prevState);
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
      <Switch
        checkedChildren="Show only US supported"
        unCheckedChildren="Include non US supported"
        onChange={handleOnChangeUsSupportedOnly}
      />
      <br />
      <Switch
        checkedChildren="Test mode only"
        unCheckedChildren="Include non test mode"
        onChange={handleOnChangeTestModeOnly}
      />
      <header>CURRENCIES</header>
      <div id="currencies">
        {filteredCurrencies.map(({ name }) => (
          <div className="currency">{name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
