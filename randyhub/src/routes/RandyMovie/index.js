import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './styles.module.scss';

const MoviesWithRandy = (props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const r = sessionStorage.getItem('searchResults');
    setResults(JSON.parse(r) || []);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('searchResults', JSON.stringify(results));
  }, [results]);

  const getSearchResults = () => {
    const url = `https://proxy.randyhub.live/?https://v2.sg.media-imdb.com/suggestion/${query.charAt(0)}/${query.replace(' ', '_')}.json`;

    return fetch(url, {
      credentials: 'omit',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0',
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-CA,en-US;q=0.7,en;q=0.3',
      },
      referrer: 'https://www.imdb.com/',
      method: 'GET',
    }).then((r) => r.json());
  };

  const onSearch = async (e) => {
    setQuery(e.target.value.trim().toLowerCase());
    if (query.length > 3) {
      const response = await getSearchResults();
      setResults(response?.d ?? []);
    }
  };

  const mediaClick = (id) => {
    const path = `/movies-with-randy/${id}`;
    const { history } = props;
    history?.push(path);
  };

  return (
    <>
      <div className={`${styles['movies-with-randy']}`}>
        <h1>Movies with Randy</h1>
        <p>Watch movies that Randy has directed, written, and acted in:</p>
        <input type="search" id="search" name="q" aria-label="Search through site content" onChange={onSearch} />
        <ul>
          {results.map((result) => {
            // only get media and not silly imdb stuff
            if (!['tt', 'nm'].includes(result.id.substring(0, 2))) {
              return null;
            }

            return (
              <li id={result.id}>
                <div
                  onClick={() => mediaClick(result.id)}
                  onKeyPress={() => mediaClick(result.id)}
                  role="button"
                  tabIndex="0"
                >
                  <img alt={`Poster for: ${result.l}`} src={result.i?.imageUrl.replace('_V1_', '_V1_UX50_,268_AL')} />
                  <div>
                    { /* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    <h2>{result.l} <small>{result?.yr}</small></h2>
                    <p>{result.s.split(', ').map(() => 'Randy Hu').join(',')}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default withRouter(MoviesWithRandy);
