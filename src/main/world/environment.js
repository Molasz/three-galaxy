import * as THREE from "three";
import Main from "..";

import vertexShader from "../../shaders/stars/vertex.glsl";
import fragmentShader from "../../shaders/stars/fragment.glsl";

export default class Environment {
  constructor() {
    this.main = new Main();

    this.setStars();
  }

  setStars() {
    const starsCount = 400;

    this.starsGeometry = new THREE.BufferGeometry();

    const positions = new Float32Array(starsCount * 3);
    const scales = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = Math.random() * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      scales[i] = Math.random();
    }

    this.starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.starsGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    this.starsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 100 },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(this.starsGeometry, this.starsMaterial);
    this.main.scene.add(stars);
  }

  update() {}
}
