import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [rates, setRates] = useState([]);

  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');

  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  useEffect(() => {
    (async () => {
      await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
        .then(res => res.json())
        .then(json => {
          // setRates(json);
          // console.log(json);
          let a = {};
          for(let i=0; i<json.length; i++){
            // console.log(json[i]);
            a[json[i].cc] = json[i].rate
          }
          console.log(a);
          setRates(a);
        })
        .catch(err => {
          console.warn(err);
          alert('Не удалось получить информацию');
        });
    })();
  }, []);

  const onChangeFromPrice = value => {
    setFromPrice(value);

    // const price = value / rates[toCurrency];
    // const res = (Math.round(price * rates[fromCurrency]*1000))/1000;
    const price = rates[fromCurrency] / rates[toCurrency];
    const res = Math.round(price * value * 1000) /1000;
    setToPrice(res);
  }

  const onChangeToPrice = value => {
    setToPrice(value);

    // const price = value / rates[fromCurrency];
    // const res = (Math.round(price * rates[toCurrency]*1000))/1000;

    const price = rates[toCurrency] / rates[fromCurrency];
    const res = Math.round(price * value * 1000) /1000;
    setFromPrice(res);
  }

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeValue={onChangeFromPrice}
        onChangeCurrency={setFromCurrency}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeValue={onChangeToPrice}
        onChangeCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;
