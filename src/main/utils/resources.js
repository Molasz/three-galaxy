import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Main from "..";
import EventEmitter from "./eventEmitter";
import { sourceTypes } from "../sources";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.main = new Main();
    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    this.sources.forEach((source) => {
      if (source.type === sourceTypes.texture) {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source.name, file);
        });
      } /* else if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } */
    });
  }

  sourceLoaded(name, file) {
    this.items[name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) this.trigger("loaded");
  }
}
