import {
  gsap,
} from 'gsap';
import React, {
  useEffect, useState, useRef,
} from 'react';
import sampleMouth from '../../assets/coolhead.png';
import './style.scss';

const NewCustomCursor = () => {
  const [cursorToggled, setCursorToggled] = useState(false);
  const circle = useRef(null);
  const mouth = useRef(null);
  const start = new Date();
  const mouse = { x: 0, y: 0 };
  const setter = { x: 0, y: 0 };
  const speed = 0.035;
  const radius = 200;
  const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  useEffect(() => {
    function moveCircle(event) {
      if (event) {
        if (circle.current) {
          gsap.to(circle.current, 0.1, {
            x: event.x,
            y: event.y,
            z: 0.1,
          });
        }
        mouse.x = event.x;
        mouse.y = event.y;
      }
    }

    function updateTicker() {
      // adjust speed for higher refresh monitors
      const dt = 1.0 - (1.0 - speed) ** gsap.ticker.deltaRatio();
      const time = start - Date.now();
      position.x += ((mouse.x + radius * Math.sin(time * 0.001)) - position.x) * dt;
      position.y += ((mouse.y + radius * Math.cos(time * 0.001)) - position.y) * dt;
      setter.x(position.x);
      setter.y(position.y);

      // set rotation
      if (mouth.current) {
        const target = mouth.current.getBoundingClientRect();
        const centerX = target.x + target.width / 2;
        const centerY = target.y + target.height / 2;
        const rotation = Math.atan2(
          (mouse.y - centerY),
          (mouse.x - centerX),
        ) * (180 / Math.PI);
        gsap.set(mouth.current, {
          rotation,
        });
      }
    }

    if (mouth.current) {
      setter.x = gsap.quickSetter(mouth.current, 'x', 'px');
      setter.y = gsap.quickSetter(mouth.current, 'y', 'px');
      gsap.set(mouth.current, {
        scale: 0.3,
      });
    }
    window.addEventListener('mousemove', moveCircle);
    gsap.ticker.add(updateTicker);
  });

  function toggleSlider() {
    setCursorToggled(!cursorToggled);
  }

  return (
    <>
      <div className="cursor">
        <div
          className={`cursor-circle ${!cursorToggled ? 'disabled' : ''}`}
          ref={circle}
        />
        <img
          src={sampleMouth}
          alt="Img"
          className={`cursor-circle-follow ${!cursorToggled ? 'disabled' : ''}`}
          ref={mouth}
        />
      </div>
      <div className="toggle-cursor">
        <img className="slider-hint" src={sampleMouth} alt="Click the toggle..." />
        <label htmlFor="slider-checkbox" className="switch">
          <input onClick={toggleSlider} id="slider-checkbox" type="checkbox" />
          <span className="slider round" />
        </label>
      </div>
    </>
  );
};

export default NewCustomCursor;
