import Main from "..";
import Earth from "./earth";
import Sun from "./sun";
import Environment from "./environment";

export default class Galaxy {
  constructor() {
    this.main = new Main();

    this.main.resources.on("loaded", () => {
      this.sun = new Sun();
      this.earth = new Earth();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.sun) this.sun.update();
    if (this.earth) this.earth.update();
    if (this.environment) this.environment.update();
  }
}
