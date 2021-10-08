import React, {
  PureComponent,
} from 'react';
import './styles.module.scss';

class CovidCounter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      covidData: [],
    };
  }

  componentDidMount() {
    const covidResponse = fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=CA')
      .then((response) => response.json())
      .then((response) => response.locations)
      .then((response) => response.map((data) => ({
        province: data.province,
        ...data.latest,
      })));

    Promise.resolve(covidResponse).then((values) => this.setState({
      covidData: values,
    }));
  }

  render() {
    const { covidData } = this.state;
    return (
      <>
        <h1>COVID DASHBOARD for Canada</h1>
        <table>
          <thead>
            <tr>
              { covidData.length === 0
                ? <th>Retrieving Data</th>
                : Object.keys(covidData[0]).map((title) => <th key={title}>{title}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              covidData.map((covidLocation) => (
                <tr key={covidLocation.province}>
                  {
                      Object.values(covidLocation).map((value, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <td key={`${covidLocation.province}-${index}`}>{value}</td>
                      ))
                    }
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="100%">
                source:
                {' '}
                <a href="https://systems.jhu.edu/research/public-health/ncov/" rel="noreferrer" target="_blank">Johns Hopkins University</a>
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
}

export default CovidCounter;
