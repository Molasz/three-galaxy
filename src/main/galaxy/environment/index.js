import Main from "../..";
import Stars from "./stars";
import StarsS from "./starsS";

const debug = {
  radius: 400,
};
export default class Environment {
  constructor() {
    this.main = new Main();

    if (this.main.debug.active) this.setDebugger();

    this.stars = new Stars(this.envDebug);
    this.starsS = new StarsS(this.envDebug);
  }

  update() {
    if (this.stars) this.stars.update();
  }

  setDebugger() {
    this.envDebug = this.main.debug.ui.addFolder("Environment");
    this.envDebug
      .add(debug, "radius", 100, 500, 1)
      .name("Radius")
      .onFinishChange(() => {
        this.main.scene.remove(this.stars.mesh);
        this.stars.mesh.geometry.dispose();
        this.stars.mesh.material.dispose();

        this.stars.setGeometry();
        this.stars.setMesh();

        this.main.scene.remove(this.starsS.mesh);
        this.starsS.mesh.geometry.dispose();
        this.starsS.mesh.material.dispose();

        this.starsS.setGeometry();
        this.starsS.setMesh();
      });
  }
}
