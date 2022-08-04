import React, {
  useEffect, useRef,
} from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderTarget, Color, TextureLoader,
  DoubleSide, Mesh,
  WebGL1Renderer, Clock, PlaneBufferGeometry, ShaderMaterial, PlaneGeometry, MeshBasicMaterial,
} from 'three';
import SnackOfChampions from '../../../assets/snackofchampions.png';
import {
  fragmentShader, vertexShader,
} from './shader';

const WaterfallType = () => {
  // Reference: https://tympanus.net/codrops/2020/06/02/kinetic-typography-with-three-js/

  let renderer;
  let camera;
  let scene;
  let clock;
  let fontGeometry;
  let loader;
  let fontMaterial;
  let rt;
  let rtCamera;
  let rtScene;
  let text;
  let geometry;
  let material;
  let mesh;

  const mount = useRef(null);

  const createRenderTarget = () => {
    // Render Target setup
    rt = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
    );
    rtCamera = new PerspectiveCamera(45, 1, 0.1, 1000);
    rtCamera.position.z = 10;

    rtScene = new Scene();
    rtScene.background = new Color('#000000');
    fontGeometry = new PlaneGeometry(352, 1200);

    // Create text mesh with font geometry and material
    text = new Mesh(fontGeometry, fontMaterial);

    // Adjust dimensions
    text.position.set(0.965, 0.275, 0.5);
    text.rotation.set(Math.PI / 4, 0, Math.PI / 4);
    text.scale.set(0.01, 0.01, 0.01);

    // Add text mesh to buffer scene
    rtScene.add(text);
  };

  const createMesh = () => {
    geometry = new PlaneBufferGeometry(240, 260, 16, 14);
    material = new ShaderMaterial({
      fragmentShader,
      uniforms: {
        uTexture: { value: rt.texture },
        uTime: { value: 0 },
      },
      vertexShader,
    });

    mesh = new Mesh(geometry, material);

    const peak = 10;
    const vertices = mesh.geometry.attributes.position.array;
    for (let index = 0; index <= vertices.length; index += 3) {
      vertices[index + 2] = peak * Math.random();
    }
    mesh.geometry.attributes.position.array = vertices;

    scene.add(mesh);
  };

  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const renderAnimation = () => {
    // Update time
    material.uniforms.uTime.value = clock.getElapsedTime();

    // Draw Render Target
    renderer.setRenderTarget(rt);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);

    renderer.render(scene, camera);
  };

  const animate = () => {
    requestAnimationFrame(animate.bind(this));
    renderAnimation();
  };

  const addEvents = () => {
    window.addEventListener('resize', resize.bind(this));
  };

  // Create Scene + Camera
  const init = () => {
    camera = new PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );

    camera.position.x = -28;
    camera.position.y = -150;
    camera.position.z = 92.5;
    camera.rotation.x = 1.01;
    camera.rotation.y = -0.15;
    camera.rotation.z = 0.245;

    scene = new Scene();
    clock = new Clock();

    renderer = new WebGL1Renderer({
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    mount.current.appendChild(renderer.domElement);

    // Load texture containing font glyps
    loader = new TextureLoader();
    loader.load(SnackOfChampions, (texture) => {
      fontMaterial = new MeshBasicMaterial(
        {
          color: 0xffffff,
          map: texture,
          negate: false,
          side: DoubleSide,
          transparent: true,
        },
      );

      createRenderTarget();
      createMesh();
      animate();
      addEvents();
    });
  };

  useEffect(() => {
    if (!scene) {
      init();
    }
  }, []);

  return (
    <div id="waterfall" ref={mount} />
  );
};

export default WaterfallType;
