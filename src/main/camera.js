import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Main from "./";

export default class Camera {
  constructor() {
    this.main = new Main();

    this.setInstance();
    this.setOrbitControls();
  }
  º;

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.main.sizes.width / this.main.sizes.height, 0.1, 1000);
    this.instance.position.set(150, 75, 150);
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
    if (this.controls) this.controls.update();
  }
}
