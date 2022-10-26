import React, { useEffect, useState } from "react";
import "./stil.scss"
import Column from "./components/columns";

const App = () => {
  const [data, setData] = useState({ gifovi: [] });
  const [query, setQuery] = useState("");

  const fetchData = () => {
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=cNo3d50T1O9ClGQHChGDjozBIDTuDigF&limit=25&rating=g"
    )
      .then((res) => res.json())
      .then((dataRes) => {
        const vrednost = dataRes.data.reduce((acc, el, i) => {
          const niz = i % 3;
          if (!acc[niz]) acc[niz] = [];
          acc[niz].push(el);
          return acc;
        }, []);
        setData({ gifovi: vrednost });
      });
  };
  useEffect(fetchData, []);

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const enter = (e) => {
    if (e.keyCode === 13) {
      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=cNo3d50T1O9ClGQHChGDjozBIDTuDigF&q=${query}&limit=25&offset=0&rating=g&lang=en`
      )
        .then((res) => res.json())
        .then((results) => {
          const vrednost = results.data.reduce((acc, el, i) => {
            const niz = i % 3;
            if (!acc[niz]) acc[niz] = [];
            acc[niz].push(el);
            return acc;
          }, []);
          setData({ gifovi: vrednost });
          setQuery("");
        });
    }
  };

  console.log(query);

  if (!data.gifovi.length) return null;

  return (
    <div className="app">
      <header>Giphy App</header>
      <main>
        <h1>Search Giphy</h1>
        <input onChange={getQuery} value={query} onKeyDown={enter}></input>
        <div className="results">
          <Column data={data.gifovi[0]} />
          <Column data={data.gifovi[1]} />
          <Column data={data.gifovi[2]} />
        </div>
      </main>
    </div>
  );
};

export default App;