import React from 'react';
import {
  Link,
} from 'react-router-dom';
import MashedPotatoes from '../../assets/mashedpotatoes.jpg';
import CoolBro from '../../assets/CoolBro.jpg';
import Links from '../../common/Links';
import styles from './styles.module.scss';

const CookingWithRandy = () => (
  <>
    <div className={`${styles['cooking-with-randy']}`}>
      <h1 className={`${styles.title}`}>The ONLY PLAUSIBLE 30 second meal from Randy</h1>
      <h2>In the middle of an online game that you can&apos;t pause?</h2>
      <h2>Perhaps you only have 30 seconds in between respawn timers?</h2>
      <h2>Need sustenance for your gamer bod?</h2>
      <h2>Look no further than this simple recipe</h2>

      <h3>
        Ingredients:
        <ul>
          <li>Instant Mashed Potatoes </li>
          <img alt="Not mashed potatoes" height="320px" src={MashedPotatoes} width="200px" />
          <li className={`${styles.italics}`}>Literally nothing else</li>
        </ul>
      </h3>

      <h3>
        Steps:
        <ol>
          <li>Open box of instant mashed potatoes</li>
          <li>Open packet of instant mashed potatoes</li>
          <li>Pour into gamer mouth</li>
          <li>Respawn and return to your gaming</li>
        </ol>
        <img alt="Cool bro" height="200px" src={CoolBro} width="142px" />
      </h3>

      <p>
        Bonus points:  Add Randy&apos;s
        {' '}
        <Link to="/snack-of-champions">favourite snack of choice</Link>
      </p>
    </div>
    <Links />
  </>
);

export default CookingWithRandy;
