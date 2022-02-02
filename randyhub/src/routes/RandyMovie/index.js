import React, { useState } from 'react';
import Links from '../../common/Links';
import styles from './styles.module.scss';

const MoviesWithRandy = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const getSearchResults = () => (fetch(`https://v2.sg.media-imdb.com/suggestion/${query.charAt(0)}/${query.replace(' ', '_')}.json`, {
    credentials: 'omit',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0',
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'en-CA,en-US;q=0.7,en;q=0.3',
    },
    referrer: 'https://www.imdb.com/',
    method: 'GET',
  }).then((r) => r.json())
  );

  const onSearch = async (e) => {
    setQuery(e.target.value);
    if (query.length > 3) {
      const response = await getSearchResults();
      setResults(response?.d ?? []);
    }
  };

  return (
    <>
      <div className={`${styles['movies-with-randy']}`}>
        <h1>Movies with Randy</h1>
        <p><i>Watch movies that Randy has Directed, Written, and Acted in: </i></p>

        <input type="search" id="search" name="q" aria-label="Search through site content" onChange={onSearch} />
        <ul>
          {results.map((result) => (
            <li id={result.id}>
              <img alt={`Poster for: ${result.l}`} src={result.i?.imageUrl.replace('_V1_', '_V1_UX50_,268_AL')} />
              {result.l}
            </li>
          ))}
        </ul>
      </div>
      <Links />
    </>
  );
};

export default MoviesWithRandy;
