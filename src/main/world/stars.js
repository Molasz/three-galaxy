import * as THREE from "three";
import Main from "..";

import vertexShader from "../../shaders/stars/vertex.glsl";
import fragmentShader from "../../shaders/stars/fragment.glsl";

const debug = {
  radius: 150,
  size: 100,
  count: 5000,
};

export default class Stars {
  constructor() {
    this.main = new Main();

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    if (this.main.debug.active) {
      const stars = this.main.debug.ui.addFolder("Stars");
      stars.add(debug, "count", 1000, 10000, 1).name("Count");
      stars.add(this.material.uniforms.uSize, "value", 10, 300, 1).name("Size");
      stars.add(debug, "radius", 50, 200, 1).name("Radius");
      stars.onFinishChange(() => this.resetStars());
    }
  }

  setGeometry() {
    const starsCount = debug.count;

    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(starsCount * 3);
    const randoms = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      const position = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      position.setLength(debug.radius);

      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;

      randoms[i] = Math.random();
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uTexture: { value: this.main.resources.items["starTexture"] },
        uSize: { value: debug.size },
        uTime: { value: 0 },
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

  destroy() {
    this.main.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  update() {
    this.material.uniforms.uTime.value = this.main.time.elapse;
  }

  resetStars() {
    this.destroy();
    this.setGeometry();
    this.setMesh();
  }
}
