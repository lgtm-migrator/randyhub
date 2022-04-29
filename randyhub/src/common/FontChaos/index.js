import React from 'react';
import { createGlobalStyle } from 'styled-components';

const FontChaos = (props) => {
  const {
    globalFont,
  } = props;

  const Braille = createGlobalStyle`
  * {
    font-family: Braille !important;
  }`;

  const Damgram = createGlobalStyle`
  * {
    font-family: Damgram !important;
  }`;

  const Mortina = createGlobalStyle`
  * {
    font-family: Mortina !important;
  }`;

  return (
    <>
      {globalFont === 3 && <Braille />}
      {globalFont === 2 && <Damgram />}
      {globalFont === 1 && <Mortina />}
    </>
  );
};

export default FontChaos;
