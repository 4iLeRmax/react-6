import React, { useEffect, useState } from 'react';

import json from './data.json';

import Collection from './Collection';

import './index.scss';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [colections, setColections] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setColections(json.collections);
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [categoryId]);

  useEffect(()=>{
    
  }, [page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((cat, index) =>
            <li
              key={cat.name}
              className={categoryId === index ? 'active' : ''}
              onClick={() => setCategoryId(index)}
            >{cat.name}</li>
          )}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <div className="loading">
            <h2>Loading<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span></h2>
          </div>
        ) : (
          colections
          .filter(item =>
            (item.name).toLowerCase().includes(searchValue.toLowerCase())
          )
          .filter(item => {
            if (item.category === categoryId) return true;
            if (categoryId === 0) return true;
          })
          .map((item, index) =>
            <Collection
              key={index}
              name={item.name}
              images={item.photos}
            />
          )
        )}
      </div>
      <ul className="pagination">
          {
            [...Array(5)].map((_, index)=> (
              <li 
                key={index}
                className={page === index + 1 ? 'active' : ''}
                onClick={()=> setPage(index + 1)}
              >{index+1}</li>
            ))
          }
      </ul>
    </div>
  );
}

export default App;
