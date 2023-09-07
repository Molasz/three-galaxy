import * as THREE from "three";
import Main from "../..";

const debug = {
  count: 1000,
  size: 15,
};

export default class StarsS {
  constructor(envDebug) {
    this.main = new Main();
    this.envDebug = envDebug;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    if (this.envDebug) this.setDebugger();
  }

  setGeometry() {
    const starsCount = debug.count;

    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);

    const color = new THREE.Color();
    const radius = this.envDebug.children.find((child) => child.property === "radius").object.radius;

    for (let i = 0; i < starsCount; i++) {
      const position = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      position.setLength(radius);

      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;

      color.setRGB(Math.random() + 0.1, Math.random() + 0.1, 0);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  }

  setMaterial() {
    this.material = new THREE.PointsMaterial({
      precision: "lowp",
      vertexColors: true,
      transparent: true,
      alphaMap: this.main.resources.items["starSTexture"],
      size: debug.size,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9,
    });
  }

  setMesh() {
    this.mesh = new THREE.Points(this.geometry, this.material);
    this.main.scene.add(this.mesh);
  }

  setDebugger() {
    const stars = this.envDebug.addFolder("Stars S");
    stars.close();

    stars
      .add(debug, "count", 100, 5000, 1)
      .name("Count")
      .onFinishChange(() => {
        this.main.scene.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();

        this.setGeometry();
        this.setMesh();
      });

    stars
      .add(debug, "size", 1, 50, 0.1)
      .name("Size")
      .onFinishChange(() => {
        this.main.scene.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();

        this.setMaterial();
        this.setMesh();
      });
  }
}
