import Main from "..";
import Earth from "./earth";
import Stars from "./stars";
import Sun from "./sun";

export default class World {
  constructor() {
    this.main = new Main();

    this.main.resources.on("loaded", () => {
      this.sun = new Sun();
      this.earth = new Earth();
      this.stars = new Stars();
    });
  }

  update() {
    if (this.sun) this.sun.update();
    if (this.earth) this.earth.update();
    if (this.stars) this.stars.update();
  }
}
