import {
  gsap,
} from 'gsap';
import React, {
  useEffect, useState, useRef,
} from 'react';
import sampleImage from '../../assets/mashedpotatoes.jpg';
import sampleMouth from '../../assets/coolhead.png';
import './style.scss';

const CustomCursor = () => {
  const [cursorToggled, setCursorToggled] = useState(false);
  const circle = useRef(null);
  const follow = useRef(null);
  const mouth = useRef(null);

  function setScaleAndRotation(event) {
    if (follow.current) {
      const target = follow.current.getBoundingClientRect();
      const centerX = target.x + target.width / 2;
      const centerY = target.y + target.height / 2;
      const scale = Math.min(
        Math.sqrt(((event.y - centerY) ** 2) + ((event.x - centerX) ** 2)) * 0.002,
        1,
      );
      gsap.set(follow.current, {
        rotation: Math.atan2(
          (event.y - centerY),
          (event.x - centerX),
        ) * (180 / Math.PI) + 90,
        scale,
      });
    }
  }

  function setMouthScaleAndRotation(event) {
    if (mouth) {
      const target = mouth.current.getBoundingClientRect();
      const centerX = target.x + target.width / 2;
      const centerY = target.y + target.height / 2;
      const scale = Math.min(
        Math.sqrt(((event.y - centerY) ** 2) + ((event.x - centerX) ** 2)) * 0.004,
        1.5,
      );
      gsap.set(mouth.current, {
        rotation: Math.atan2(
          (event.y - centerY),
          (event.x - centerX),
        ) * (180 / Math.PI),
        scale,
      });
    }
  }

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
        if (follow.current) {
          gsap.to(follow.current, 1.0, {
            x: event.x,
            y: event.y,
            z: 0.1,
            onUpdate: setScaleAndRotation,
            onUpdateParams: [event],
          });
        }
        if (mouth.current) {
          gsap.to(mouth.current, 2.0, {
            x: event.x,
            y: event.y,
            z: 0.1,
            onUpdate: setMouthScaleAndRotation,
            onUpdateParams: [event],
          });
        }
      }
    }

    window.addEventListener('mousemove', moveCircle);
  }, []);

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
          src={sampleImage}
          alt="Img"
          className={`cursor-circle-follow ${!cursorToggled ? 'disabled' : ''}`}
          ref={follow}
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

export default CustomCursor;
