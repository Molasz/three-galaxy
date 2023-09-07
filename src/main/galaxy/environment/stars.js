import * as THREE from "three";
import Main from "../..";

import vertexShader from "../../../shaders/stars/vertex.glsl";
import fragmentShader from "../../../shaders/stars/fragment.glsl";

const debug = {
  count: 250,
  maxSize: 100,
  speedSize: 20,
};

export default class Stars {
  constructor(envDebug) {
    this.main = new Main();
    this.envDebug = envDebug;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    if (this.envDebug) this.setDebugger();
  }

  setGeometry() {
    const starsCount = debug.count;

    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 2);
    const sizes = new Float32Array(starsCount);
    const randoms = new Float32Array(starsCount);

    const radius = this.envDebug.children.find((child) => child.property === "radius").object.radius;

    for (let i = 0; i < starsCount; i++) {
      const position = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      position.setLength(radius);

      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();

      sizes[i] = 500 + Math.random() * debug.maxSize * 100;
      randoms[i] = Math.random() + 1;
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 2));
    this.geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    this.geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      precision: "lowp",
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uTime: { value: 0 },
        uSpeed: { value: debug.speedSize },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }

  setMesh() {
    this.mesh = new THREE.Points(this.geometry, this.material);
    this.main.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value = this.main.time.elapse;
  }

  setDebugger() {
    const stars = this.envDebug.addFolder("Stars");
    stars.close();

    stars
      .add(debug, "count", 100, 1000, 1)
      .name("Count")
      .onFinishChange(() => {
        this.main.scene.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();

        this.setGeometry();
        this.setMesh();
      });

    stars
      .add(debug, "maxSize", 1, 100, 1)
      .name("Max Size")
      .onFinishChange(() => {
        this.main.scene.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();

        this.setGeometry();
        this.setMesh();
      });

    stars.add(this.material.uniforms.uSpeed, "value", 1, 100, 1).name("Speed");
  }
}
