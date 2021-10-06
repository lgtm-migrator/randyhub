import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import styles from './styles.module.scss';

class CovidCounter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      covidData: []
    };
  }

  componentDidMount () {
    const covidResponse = fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=CA')
      .then(r => r.json())
      .then(r => r.locations)
      .then(r => r.map(x => ({ province: x.province, ...x.latest })))
      .catch(err => console.error(`COVID ERROR: ${JSON.stringify(err)}`));

    Promise.resolve(covidResponse).then((values) => {
      this.setState({
        covidData: values,
      });
    })
  }

  render () {
    console.log(this.state.covidData);
    return (
      <>
        <h1>COVID DASHBOARD for Canada</h1>
        <table>
          <thead>
            <tr>
              { this.state.covidData.length !== 0 ?
                Object.keys(this.state.covidData[0]).map((title) => {
                  return <th>{title}</th>
                })
                : <th>Retrieving Data</th>
              }
            </tr>
          </thead>
          <tbody>
              {
                this.state.covidData.map((c) => {
                  return (
                    <tr>
                      {
                        Object.values(c).map((value) => {
                          return (
                            <td>{value}</td>
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
              <td colspan="100%">
                source: <a target="_blank" href="https://systems.jhu.edu/research/public-health/ncov/" rel="noreferrer">Johns Hopkins University</a>
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
