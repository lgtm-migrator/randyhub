import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const CovidCounter = () => {
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const covidResponse = await fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=CA')
        .then((response) => response.json())
        .then((response) => response.locations)
        .then((response) => response.map((data) => ({
          province: data.province,
          ...data.latest,
        })));

      setCovidData(covidResponse);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={`${styles['covid-dashboard']}`}>
        <h1>COVID DASHBOARD for Canada</h1>
        <table>
          <thead>
            <tr>
              {covidData.length === 0
                ? <th>Retrieving Data...</th>
                : Object.keys(covidData[0]).map((title) => <th key={title}>{title}</th>)}
            </tr>
          </thead>
          <tbody>
            {covidData.map((covidLocation) => (
              <tr key={covidLocation.province}>
                {Object.values(covidLocation).map((value, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <td key={`${covidLocation.province}-${index}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="100%">
                Source:
                {' '}
                <a href="https://systems.jhu.edu/research/public-health/ncov/" rel="noreferrer" target="_blank">Johns Hopkins University</a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default CovidCounter;
