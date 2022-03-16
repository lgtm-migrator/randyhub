import {
  gsap,
} from 'gsap';
import React, {
  useEffect, useRef,
} from 'react';
import sampleMouth from '../../assets/coolhead.png';
import './style.scss';

const RandyGalaxyCursor = (props) => {
  const { count } = props;
  const circle = useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mouths = Array(count).fill().map(() => (useRef(null)));
  const start = new Date();
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const setter = Array(count).fill().map(() => ({ x: 0, y: 0 }));
  const speed = 0.015;
  const position = Array(count)
    .fill().map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));

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
      mouths.forEach((mouth, index) => {
        const dt = 1.0 - (1.0 - speed) ** gsap.ticker.deltaRatio();
        const time = start - Date.now();
        const radius = index * 50 + 100;
        position[index].x += (
          (mouse.x + radius * Math.sin(time * 0.001 + index))
          - position[index].x) * dt;
        position[index].y += (
          (mouse.y + radius * Math.cos(time * 0.001 + index))
          - position[index].y) * dt;
        setter[index].x(position[index].x);
        setter[index].y(position[index].y);

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
      });
    }

    mouths.forEach((mouth, index) => {
      if (mouth.current) {
        setter[index].x = gsap.quickSetter(mouth.current, 'x', 'px');
        setter[index].y = gsap.quickSetter(mouth.current, 'y', 'px');
        gsap.set(mouth.current, {
          scale: 0.3,
        });
      }
    });

    window.addEventListener('mousemove', moveCircle);
    gsap.ticker.add(updateTicker);
  });

  const randies = [];
  for (let i = 0; i < count; i += 1) {
    randies.push(
      <img
        src={sampleMouth}
        alt="Img"
        className="randy-head"
        ref={mouths[i]}
        key={i}
      />,
    );
  }

  return (
    <>
      <div className="stellar-cursor">
        <div
          className="cursor-circle"
          ref={circle}
        />
        {randies}
      </div>
    </>
  );
};

export default RandyGalaxyCursor;
