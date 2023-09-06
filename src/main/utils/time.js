import EventEmitter from "./eventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapse = 0;

    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    const currentTime = Date.now();
    this.current = currentTime;

    this.elapse = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => this.tick());
  }
}
