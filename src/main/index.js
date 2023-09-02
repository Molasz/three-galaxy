import * as THREE from "three";

import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Camera from "./camera";
import Renderer from "./renderer";
import World from "./world";
import Resources from "./utils/resources";
import { sources } from "./sources";
import Debug from "./utils/debug";

let instance;

export default class Main {
  constructor(canvas) {
    if (instance) return instance;
    window.main = this;
    instance = this;
    this.canvas = canvas;
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();

    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());

    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(sources);
    this.world = new World();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    if (this.debug.active) this.debug.stats.begin();
    this.camera.update();
    this.world.update();
    this.renderer.update();
    if (this.debug.active) this.debug.stats.end();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === "function") value.dispose();
        }
      }
    });

    if (this.camera.controls) this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
