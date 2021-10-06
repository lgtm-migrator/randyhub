import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import Snack from '../../assets/snackofchampions.jpg';

class SnackOfChampions extends PureComponent {
  render () {
    return (
      <img
        alt='Snack of Champions.'
        src={Snack}
      />
    );
  }
}

SnackOfChampions.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default SnackOfChampions;
