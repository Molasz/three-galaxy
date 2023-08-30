import * as THREE from "three";
import Main from "./";

export default class Renderer {
  constructor() {
    this.main = new Main();

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.main.canvas,
      antialias: true,
    });

    this.instance.useLegacyLights = false;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.main.sizes.width, this.main.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  resize() {
    this.instance.setSize(this.main.sizes.width, this.main.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update() {
    this.instance.render(this.main.scene, this.main.camera.instance);
  }
}
