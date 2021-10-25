import React from 'react';
import styles from './styles.module.scss';
import Curtain from './component/Curtain';
import Links from '../../common/Links';

const Main = () => (
  <div className={`${styles.body}`}>
    <h1 className={`${styles.title}`}>
      <span className={`${styles.italics}`}>RAN</span>
      <span className={`${styles.bold}`}>DYHUB</span>
    </h1>
    <h2 className={`${styles.subtitle}`}>
      sponsored by chaos
    </h2>
    <Curtain />
    <Links />
  </div>
);
export default Main;
