import { Observer } from "./observer.js"

export class GlobalWare extends Observer {
  constructor() {
    if (GlobalWare.exists) {
      return GlobalWare.instance;
    }

    super();

    GlobalWare.instance = this;
    GlobalWare.instance.currentState = [];
    GlobalWare.exists = true;
  }

  update(value) {
    GlobalWare.instance.currentState = [value, ...GlobalWare.instance.currentState];
  }

  clear() {
    GlobalWare.instance.currentState = [];
  }
}
