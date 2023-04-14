import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [rates, setRates] = useState([]);

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');

  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  useEffect(() => {
    (async () => {
      await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
        .then(res => res.json())
        .then(json => {
          let a = {};
          for (let i = 0; i < json.length; i++) {
            a[json[i].cc] = json[i].rate
          }
          // console.log(a);
          a['UAH'] = 1;
          setRates(a);
        })
        .catch(err => {
          console.warn(err);
          alert('Не удалось получить информацию');
        });
    })();
  }, []);

  console.log(rates);

  const onChangeFromPrice = value => {
    setFromPrice(value);
    const price = rates[fromCurrency] / rates[toCurrency];
    let res = Math.round(price * value * 10000) / 10000;
    setToPrice(res);
  }

  const onChangeToPrice = value => {
    setToPrice(value);
    const price = rates[toCurrency] / rates[fromCurrency];
    let res = Math.round(price * value * 10000) / 10000;
    setFromPrice(res);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

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
