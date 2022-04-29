import {
  gsap,
} from 'gsap';
import React, { useEffect, useState, useRef } from 'react';
import Links from '../Links';
import Chaos from '../Chaos';
import styles from './styles.module.scss';

const MenuDropdown = (props) => {
  const [toggle, setToggle] = useState(false);
  const isInitialMount = useRef(true);
  const menu = useRef(null);
  const {
    setHueFilter, hueFilter, randyCursor, setRandyCursor, globalFont, setGlobalFont,
  } = props;

  const toggleDropdown = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (toggle) {
      gsap.to(menu.current, {
        opacity: 1,
        duration: 1,
        top: 0,
      });
    } else {
      gsap.to(menu.current, {
        opacity: 0,
        duration: 1,
        top: '-100vh',
      });
    }
  }, [toggle]);

  return (
    <>
      <button
        type="button"
        className={`${styles['btn-menu']}`}
        onClick={() => toggleDropdown()}
        onKeyPress={() => toggleDropdown()}
      >
        ☰
      </button>
      <div ref={menu} className={`${styles.dropdown}`}>
        <button
          type="button"
          className={`${styles['btn-exit']}`}
          onClick={() => toggleDropdown()}
          onKeyPress={() => toggleDropdown()}
        >
          X
        </button>
        <div className={`${styles['menu-content']}`}>
          <Links
            toggleDropdown={toggleDropdown}
          />
          <Chaos
            hueFilter={hueFilter}
            setHueFilter={setHueFilter}
            randyCursor={randyCursor}
            setRandyCursor={setRandyCursor}
            globalFont={globalFont}
            setGlobalFont={setGlobalFont}
          />
        </div>
      </div>
    </>
  );
};

export default MenuDropdown;
