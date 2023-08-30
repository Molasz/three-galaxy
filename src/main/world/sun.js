import * as THREE from "three";
import Main from "..";

import vertexShader from "../../shaders/sun/vertex.glsl";
import fragmentShader from "../../shaders/sun/fragment.glsl";

const debug = {
  darkColor: "#f9b806",
  lightColor: "#ed0000",
  rotation: 0,
};

export default class Sun {
  constructor() {
    this.main = new Main();

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    if (this.main.debug.active) {
      const sun = this.main.debug.ui.addFolder("Sun");
      sun.addColor(this.material.uniforms.uDarkColor, "value").name("Dark Color");
      sun.addColor(this.material.uniforms.uLightColor, "value").name("Light Color");
      sun.add(debug, "rotation", 0, 10, 0.1).name("Rotation");
    }
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(5);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      precision: "lowp",
      uniforms: {
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

    this.mesh.rotation.y = this.main.time.elapse * debug.rotation * 0.0005;
  }
}
