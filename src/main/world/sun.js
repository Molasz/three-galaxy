import * as THREE from "three";
import Main from "..";

import vertexShader from "../../shaders/sun/vertex.glsl";
import fragmentShader from "../../shaders/sun/fragment.glsl";

const debug = {
  darkColor: "#f9b806",
  lightColor: "#ed0000",
  rotation: 2,
  speed: 2,
  amplifier: 3,
  size: 10,
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
    this.geometry = new THREE.SphereGeometry(debug.size);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      precision: "lowp",
      uniforms: {
        uSpeed: { value: debug.speed },
        uAmplifier: { value: debug.amplifier },
        uTime: { value: 0 },
        uDarkColor: { value: new THREE.Color(debug.darkColor) },
        uLightColor: { value: new THREE.Color(debug.lightColor) },
      },
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

    this.mesh.rotation.y = this.main.time.elapse * 0.0005 * debug.rotation;
  }

  setDebugger() {
    const sun = this.main.debug.ui.addFolder("Sun");
    sun.close();

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
    sun.add(this.material.uniforms.uSpeed, "value", 0, 10, 0.1).name("Animation Speed");
    sun.add(this.material.uniforms.uAmplifier, "value", 0, 20, 0.1).name("Amplifier");
    sun.addColor(this.material.uniforms.uDarkColor, "value").name("Dark Color");
    sun.addColor(this.material.uniforms.uLightColor, "value").name("Light Color");
  }
}
