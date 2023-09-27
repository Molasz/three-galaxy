import * as THREE from "three";
import Main from "..";

import vertexShader from "../../shaders/sun/vertex.glsl";
import fragmentShader from "../../shaders/sun/fragment.glsl";

const debug = {
  size: 10,
  rotation: 0.2,
  speed: 2,
  amplifier: 0.3,
  elevation: 0.7,
  colorGap: 0.5,
  innerColor: "#f5d400",
  outerColor: "#ed5502",
};

export default class Sun {
  constructor() {
    this.main = new Main();

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    if (this.main.debug.active) this.setDebugger();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(debug.size, 1024, 1024);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      precision: "lowp",
      uniforms: {
        uTime: { value: 0 },
        uInnerColor: { value: new THREE.Color(debug.innerColor) },
        uOuterColor: { value: new THREE.Color(debug.outerColor) },
        uSpeed: { value: debug.speed },
        uAmplifier: { value: debug.amplifier },
        uElevation: { value: debug.elevation },
        uColorGap: { value: debug.colorGap },
      },
      defines: {},
      vertexShader,
      fragmentShader,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.main.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value = this.main.time.elapse;
    this.mesh.rotation.y = (this.main.time.elapse * debug.rotation) / 1000.0;
  }

  setDebugger() {
    const sun = this.main.debug.ui.addFolder("Sun");
    // sun.close();

    sun
      .add(debug, "size", 5, 30, 0.1)
      .name("Size")
      .onFinishChange(() => {
        this.main.scene.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
        this.setGeometry();
        this.setMesh();
      });

    sun.add(debug, "rotation", 0, 10, 0.1).name("Rotation");
    sun.add(this.material.uniforms.uSpeed, "value", 1, 5, 0.1).name("Speed");
    sun.add(this.material.uniforms.uAmplifier, "value", 0, 1, 0.01).name("Amplifier");
    sun.add(this.material.uniforms.uElevation, "value", 0, 2, 0.1).name("Elevation");
    sun.add(this.material.uniforms.uColorGap, "value", 0, 1, 0.01).name("Color Gap");
    sun.addColor(this.material.uniforms.uInnerColor, "value").name("Inner Color");
    sun.addColor(this.material.uniforms.uOuterColor, "value").name("Outer Color");
  }
}
