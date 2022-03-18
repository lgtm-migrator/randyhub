import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import BreakfastOfChampionsCursor from '../../common/BreakfastOfChampionsCursor';

const CookingWithRandy = () => (
  <>
    <BreakfastOfChampionsCursor />
    <div className={`${styles['cooking-with-randy']}`}>
      <h1>Cooking with Randy</h1>
      <p>
        In the middle of an online game that you can&apos;t pause?
        <br />
        Perhaps you only have 30 seconds in between respawn timers?
        <br />
        Need sustenance for your gamer bod?
        <br />
        Look no further than this simple recipe.
        <br />
        <br />
        Ingredients:
        <ul>
          <li>Instant Mashed Potatoes </li>
          <li><i>Literally nothing else</i></li>
        </ul>
        <br />
        Steps:
        <ol>
          <li>Open box of instant mashed potatoes</li>
          <li>Open packet of instant mashed potatoes</li>
          <li>Pour into gamer mouth</li>
          <li>Respawn and return to your gaming</li>
        </ol>
        <br />
        Bonus points:  Add Randy&apos;s
        {' '}
        <Link to="/snack-of-champions">favourite snack of choice.</Link>
      </p>
    </div>
  </>
);

export default CookingWithRandy;
