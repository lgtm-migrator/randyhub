import React from 'react';
import Snack from '../../assets/snackofchampions.jpg';
import styles from './style.module.scss';

const SnackOfChampions = () => (
  <>
    <img className={`${styles.snack}`} alt="Snack of Champions." src={Snack} />
  </>
);

export default SnackOfChampions;
