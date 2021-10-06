import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import { Link } from 'react-router-dom';
import MashedPotatoes from '../../assets/mashedpotatoes.jpg';
import CoolBro from '../../assets/CoolBro.jpg';
import styles from './styles.module.scss';

class CookingWithRandy extends PureComponent {
  render () {
    return (
      <>
        <h1 class={`${styles['title']}`}>The ONLY PLAUSIBLE 30 second meal from Randy</h1>
        <h2>In the middle of an online game that you can't pause?</h2>
        <h2>Perhaps you only have 30 seconds in between respawn timers?</h2>
        <h2>Need sustenance for your gamer bod?</h2>
        <h2>Look no further than this simple recipe</h2>
    
        <h3>Ingredients:
            <ul>
                <li>Instant Mashed Potatoes </li>
                <img src={MashedPotatoes} width="200px" height="320px" alt="Not mashed potatoes" />
                <li class={`${styles['italics']}`}>Literally nothing else</li>
            </ul>
        </h3>
        
        <h3>Steps:
            <ol>
                <li>Open box of instant mashed potatoes</li>
                <li>Open packet of instant mashed potatoes</li>
                <li>Pour into gamer mouth</li>
                <li>Respawn and return to your gaming</li>
            </ol>
            <img src={CoolBro} width="142px" height="200px" alt="Cool bro" />
        </h3>
    
        <p>Bonus points:  Add Randy's <Link to="/snack-of-champions">favourite snack of choice</Link></p>
      </>
    );
  }
}

CookingWithRandy.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default CookingWithRandy;
