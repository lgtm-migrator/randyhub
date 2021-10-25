import React from 'react';

const getCircleStyle = (contributor, index, numContributions) => {
  const backgroundColors = ['Azure', 'BlanchedAlmond', 'CornSilk', 'DarkKhaki', 'Lavender'];
  const number = contributor.contributions;
  const percentage = number / numContributions;
  const diameter = Math.max(percentage * 65, 3);

  return {
    borderRadius: '50%',
    width: `${diameter}em`,
    height: `${diameter}em`,
    border: '0.25em solid black',
    background: backgroundColors[index % backgroundColors.length],
    textAlign: 'center',
    maxHeight: `${diameter}em`,
    minHeight: `${diameter}em`,
    minWidth: `${diameter}em`,
    maxWidth: `${diameter}em`,
    wordWrap: 'break-word',
    overflow: 'hidden',
    paddingLeft: '0.3em',
    paddingRight: '0.3em',
    paddingTop: '0.3em',
    paddingBottom: '0.3em',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  };
};

const simpleCircles = (contributionsData) => {
  const individualContributions = contributionsData.map((contributor) => contributor.contributions);
  const numContributions = individualContributions.length > 0
    ? individualContributions.reduce((previous, current) => previous + current)
    : 0;

  const flexboxStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
    flexWrap: 'wrap',
    width: '90%',
  };

  return (
    <div style={flexboxStyle}>
      {contributionsData.map((contributor, index) => (
        <div style={getCircleStyle(contributor, index, numContributions)} key={contributor.login}>
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

const dummyVisual = (contributionsData) => {
  const v = contributionsData.length > 0 ? contributionsData[0].login : '';
  return <div>{v}</div>;
};

export {
  simpleCircles,
  dummyVisual,
};
