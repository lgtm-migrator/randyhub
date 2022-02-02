import React, { useState } from 'react';
import Links from '../../common/Links';
import styles from './styles.module.scss';

const MoviesWithRandy = () => {
  const [query, setQuery] = useState('');

  const onSearch = (e) => {
    setQuery(e.target.value);

    e.preventDefault();
  };

  const doSearch = () => {
    console.log(query);
  };

  return (
    <>
      <div className={`${styles['movies-with-randy']}`}>
        <h1>Movies with Randy</h1>
        <p><i>Watch movies that Randy has Directed, Written, and Acted in: </i></p>

        <input type="search" id="search" name="q" aria-label="Search through site content" onChange={onSearch} />
        <button type="button" onClick={doSearch}>Search</button>
      </div>
      <Links />
    </>
  );
};

export default MoviesWithRandy;
