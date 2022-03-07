import React from 'react';
import Curtain from './component/Curtain';
import Links from '../../common/Links';
import Chaos from '../../common/Chaos';
import styles from './styles.module.scss';

const Main = (props) => {
  const { setHueFilter, hueFilter } = props;
  return (
    <div className={`${styles.body}`}>
      <h1 className={`${styles.title}`}>
        RANDYHUB
      </h1>
      <h2 className={`${styles.subtitle}`}>
        sponsored by chaos chat
      </h2>
      <Curtain />
      <div className={`${styles.content}`}>
        <Links toggleDropdown={() => {}} />
        <Chaos setHueFilter={setHueFilter} hueFilter={hueFilter} />
      </div>
    </div>
  );
};

export default Main;
