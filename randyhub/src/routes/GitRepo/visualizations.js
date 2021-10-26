import React from 'react';
import styles from './styles.module.scss';

const backgroundColors = [
  'Azure',
  'BlanchedAlmond',
  'CornSilk',
  'DarkKhaki',
  'Lavender',
  'LightSalmon',
  'LightSteelBlue',
  'Linen',
  'MistyRose',
  'Sienna',
  'Thistle',
];

const getPercentageCircleStyle = (contributor, index, numContributions) => {
  const number = contributor.contributions;
  const percentage = number / numContributions;
  const diameter = Math.max(percentage * 65, 3);

  return {
    width: `${diameter}em`,
    height: `${diameter}em`,
    background: backgroundColors[index % backgroundColors.length],
    maxHeight: `${diameter}em`,
    minHeight: `${diameter}em`,
    minWidth: `${diameter}em`,
    maxWidth: `${diameter}em`,
  };
};

const getMarbleCircleStyle = (personIndex) => {
  const color = backgroundColors[personIndex % backgroundColors.length];
  return {
    background: color,
  };
};

const simpleCircles = (contributionsData) => {
  const individualContributions = contributionsData.map((contributor) => contributor.contributions);
  const numContributions = individualContributions.length > 0
    ? individualContributions.reduce((previous, current) => previous + current)
    : 0;

  return (
    <div className={`${styles.circleFlexRow}`}>
      {contributionsData.map((contributor, index) => (
        <div
          className={`${styles.percentageCircle}`}
          style={getPercentageCircleStyle(contributor, index, numContributions)}
          key={contributor.login}
        >
          <div>
            {contributor.login}
            <br />
            {contributor.contributions}
          </div>
        </div>
      ))}
    </div>
  );
};

const shuffleArray = (array) => {
  // Fisher-Yates algorithm to shuffle
  const arr = array;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

const marblesVisualization = (contributionsData) => {
  let marbles = [];
  let personIndex = 0;
  contributionsData.forEach((contributor) => {
    for (let i = 0; i < contributor.contributions; i += 1) {
      marbles.push({
        personIndex,
        login: contributor.login,
        key: `${contributor.login}_${i}`,
      });
    }
    personIndex += 1;
  });

  marbles = shuffleArray(marbles);

  return (
    <div className={`${styles.circleFlexRow} ${styles.jar}`}>
      {marbles.map((marble) => (
        <div
          key={marble.key}
          className={`${styles.marbleCircle}`}
          style={getMarbleCircleStyle(marble.personIndex)}
        >
          <div>
            {marble.login[0]}
          </div>
        </div>
      ))}
    </div>
  );
};

export {
  simpleCircles,
  marblesVisualization,
};
