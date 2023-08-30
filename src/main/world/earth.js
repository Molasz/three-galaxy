import * as THREE from "three";
import Main from "..";

// import vertexShader from "../../shaders/sun/vertex.glsl";
// import fragmentShader from "../../shaders/sun/fragment.glsl";

const debug = {
  position: 10,
  elapse: 1,
  rotation: 1,
};

export default class Earth {
  constructor() {
    this.main = new Main();

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    if (this.main.debug.active) {
      const earth = this.main.debug.ui.addFolder("Earth");
      earth.add(debug, "position", 0, 10, 0.1).name("Position");
      earth.add(debug, "elapse", 0, 10, 0.1).name("Elapse");
      earth.add(debug, "rotation", 0, 10, 0.1).name("Rotation");
    }
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(1);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ color: "blue" });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.main.scene.add(this.mesh);
  }

  update() {
    const rotationTime = this.main.time.elapse * debug.elapse * 0.0005;
    this.mesh.position.set(Math.sin(rotationTime) * debug.position, 0, Math.cos(rotationTime) * debug.position);

    this.mesh.rotation.y = this.main.time.elapse * debug.rotation * 0.0005;
  }
}
