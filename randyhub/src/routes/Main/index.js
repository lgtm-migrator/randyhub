import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import styles from './styles.module.scss';

class Main extends PureComponent {
  render () {
    return (
      <div className={`${styles.body}`}>
        <h1 className={`${styles.title}`}>RANDY</h1>
      </div>
    );
  }
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Main;
