import React from 'react';
import Snack from '../../assets/snackofchampions.jpg';
import Links from '../../common/Links';
import styles from './style.module.scss';

const SnackOfChampions = () => (
  <>
    <img className={`${styles.snack}`} alt="Snack of Champions." src={Snack} />
    <Links />
  </>
);

export default SnackOfChampions;
