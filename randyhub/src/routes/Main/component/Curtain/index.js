/* eslint-disable no-param-reassign */
import React, {
  PureComponent,
} from 'react';
import {
  Curtains, Plane,
} from 'react-curtains';
import DragVs from './DragVs';
import NoiseFs from './NoiseFs';
import styles from './style.module.scss';
import Art from '../../../../assets/bestpic.png';

class WebGLCurtains extends PureComponent {
  constructor(props) {
    super(props);
    this.handleMovement = this.handleMovement.bind(this);
    this.handlePlaneReady = this.handlePlaneReady.bind(this);
    this.mousePosition = {
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    this.mousePosition = {
      x: 0,
      y: 0,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMovement);
    window.removeEventListener('touchmove', this.handleMovement);
  }

  handlePlaneReady(plane) {
    window.addEventListener('mousemove', (event) => {
      this.handleMovement(event, plane);
    });

    window.addEventListener('touchmove', (event) => {
      this.handleMovement(event, plane);
    });
  }

  handleMovement(event, plane) {
    if (event.targetTouches) {
      // touch event
      this.mousePosition.x = event.targetTouches[0].clientX;
      this.mousePosition.y = event.targetTouches[0].clientY;
    } else {
      // mouse event
      this.mousePosition.x = event.clientX;
      this.mousePosition.y = event.clientY;
    }

    // convert our mouse/touch position to coordinates relative to the vertices of the plane
    const mouseCoords = plane.mouseToPlaneCoords(this.mousePosition);

    // update our mouse position uniform
    plane.uniforms.mousePosition.value = [mouseCoords.x, mouseCoords.y];

    // reassign mouse strength
    plane.uniforms.mouseStrength.value = 0.5;
  }

  render() {
    const dragUniforms = {
      mousePosition: {
        name: 'uMousePosition',
        type: '2f',
        value: [this.mousePosition.x, this.mousePosition.y],
      },
      mouseStrength: {
        name: 'uMouseStrength',
        type: '1f',
        value: 0,
      },
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
        ref={(element) => {
          this.el = element;
        }}
      >
        <>
          <Curtains className={styles['curtains-canvas']}>
            <Plane
              className={styles['curtains-plane']}
              fov={35}
              fragmentShader={NoiseFs}
              heightSegments={20}
              onReady={this.handlePlaneReady}
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
  }
}

export default WebGLCurtains;
