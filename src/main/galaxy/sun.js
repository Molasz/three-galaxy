import * as THREE from "three";
import Main from "..";

import vertexShader from "../../shaders/sun/vertex.glsl";
import fragmentShader from "../../shaders/sun/fragment.glsl";

const debug = {
  size: 10,
  rotation: 2,
  darkColor: "#fc8403",
  lightColor: "#ed0000",
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
        uTexture: { value: this.main.resources.items["sunTexture"] },
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
    sun.addColor(this.material.uniforms.uLightColor, "value").name("Light Color");
  }
}
