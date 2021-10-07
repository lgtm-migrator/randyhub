import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import './styles.module.scss';

class CovidCounter extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      covidData: [],
    };
  }

  componentDidMount () {
    const covidResponse = fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=CA')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.locations;
      })
      .then((response) => {
        return response.map((data) => {
          return {province: data.province,
            ...data.latest};
        });
      });

    Promise.resolve(covidResponse).then((values) => {
      return this.setState({
        covidData: values,
      });
    });
  }

  render () {
    return (
      <>
        <h1>COVID DASHBOARD for Canada</h1>
        <table>
          <thead>
            <tr>
              { this.state.covidData.length === 0 ?
                <th>Retrieving Data</th> :
                Object.keys(this.state.covidData[0]).map((title) => {
                  return <th key={title}>{title}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {
              this.state.covidData.map((covidLocation) => {
                return (
                  <tr key={covidLocation.province}>
                    {
                      Object.values(covidLocation).map((value, index) => {
                        return (
                          // eslint-disable-next-line react/no-array-index-key
                          <td key={`${covidLocation.province}-${index}`}>{value}</td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='100%'>
                source: <a href='https://systems.jhu.edu/research/public-health/ncov/' rel='noreferrer' target='_blank'>Johns Hopkins University</a>
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
}

CovidCounter.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default CovidCounter;
