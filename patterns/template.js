import { Observer } from "./observer.js";

export class MiddleWare extends Observer {
  constructor() {
    super()
    this.middleStateList = [];
  }

  update(value) {
    this.middleStateList = [value, ...this.middleStateList];
    this.currentState = value;
  }

  clear() {
    this.middleStateList = [];
  }
}

export class LowWare extends Observer {
  constructor() {
    super()
    this.lowStateList = [];
  }

  update(value) {
    this.lowStateList = [value, this.lowStateList[0]];
    this.currentState = value;
  }
}
