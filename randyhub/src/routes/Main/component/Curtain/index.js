/* eslint-disable no-param-reassign */
import React from 'react';
import {
  Curtains, Plane,
} from 'react-curtains';
import DragVs from './DragVs';
import NoiseFs from './NoiseFs';
import styles from './style.module.scss';
import Art from '../../../../assets/bestpic.png';

const WebGLCurtains = () => {
  const dragUniforms = {
    time: {
      name: 'uTime',
      type: '1f',
      value: 0,
    },
  };
  const onRender = (plane) => {
    // eslint-disable-next-line no-param-reassign
    plane.uniforms.time.value += 1;
  };

  return (
    <div
      id={styles['webgl-curtains-page']}
    >
      <>
        <Curtains className={styles['curtains-canvas']}>
          <Plane
            className={styles['curtains-plane']}
            fov={35}
            fragmentShader={NoiseFs}
            heightSegments={20}
            onRender={onRender}
            uniforms={dragUniforms}
            vertexShader={DragVs}
            widthSegments={20}
          >
            <img alt="Test for canvas" src={Art} />
          </Plane>
        </Curtains>
      </>
    </div>
  );
};

export default WebGLCurtains;
