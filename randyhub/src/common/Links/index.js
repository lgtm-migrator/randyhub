import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Links = (props) => {
  const { toggleDropdown } = props;

  return (
    <>
      <div className={`${styles.links}`}>
        <h3>
          Content
        </h3>
        <div>
          {' '}
          &#8260;
          <Link
            to="/"
            onClick={() => toggleDropdown()}
            onKeyPress={() => toggleDropdown()}
          >
            Main
          </Link>
        </div>
        <div>
          {' '}
          &#8260;
          <Link
            to="/snack-of-champions"
            onClick={() => toggleDropdown()}
            onKeyPress={() => toggleDropdown()}
          >
            The Snack of Champions
          </Link>
        </div>
        <div>
          {' '}
          &#8260;
          <Link
            to="/covid-counter"
            onClick={() => toggleDropdown()}
            onKeyPress={() => toggleDropdown()}
          >
            Covid Counter
          </Link>
        </div>
        <div>
          {' '}
          &#8260;
          <Link
            to="/cooking-with-randy"
            onClick={() => toggleDropdown()}
            onKeyPress={() => toggleDropdown()}
          >
            Cooking with Randy
          </Link>
        </div>
        <div>
          {' '}
          &#8260;
          <Link
            to="/git-repo"
            onClick={() => toggleDropdown()}
            onKeyPress={() => toggleDropdown()}
          >
            Randy Hub repo info
          </Link>
        </div>
        <div>
          {' '}
          &#8260;
          <Link
            to="/aurora-watch"
            onClick={() => toggleDropdown()}
            onKeyPress={() => toggleDropdown()}
          >
            Aurorawatch
          </Link>
        </div>
        <div>
          {' '}
          &#8260;
          <Link
            to="/movies-with-randy"
            onClick={() => toggleDropdown()}
            onKeyPress={() => toggleDropdown()}
          >
            Movies with Randy
          </Link>
        </div>
      </div>
    </>
  );
};

export default Links;
