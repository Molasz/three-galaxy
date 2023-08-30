import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Main from "./";

export default class Camera {
  constructor() {
    this.main = new Main();

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.main.sizes.width / this.main.sizes.height, 0.1, 500);
    this.instance.position.set(6, 4, 8);
    this.main.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.main.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.main.sizes.width / this.main.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
