import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Links = () => (
  <div className={`${styles.links}`}>
    <h2><Link to="/">Main</Link></h2>
    <h2><Link to="/snack-of-champions">The Snack of Champions</Link></h2>
    <h2><Link to="/covid-counter">Covid Counter</Link></h2>
    <h2><Link to="/cooking-with-randy">Cooking with Randy</Link></h2>
    <h2><Link to="/git-repo">Randy Hub repo info</Link></h2>
  </div>
);

export default Links;
