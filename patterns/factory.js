import { stream } from "./observer.js";
import { MiddleWare, LowWare } from "./template.js";
import { connect } from "./decorator.js";
import { GlobalWare } from "./singleton.js";

class GlobalStateWare extends GlobalWare {
  constructor(name) {
    super();
    this.name = name;
    this.type = 'global';
  }
}

class MiddleStateWare extends MiddleWare {
  constructor(name) {
    super();
    this.name = name;
    this.type = 'middle';
  }
}

class LowStateWare extends LowWare {
  constructor(name) {
    super();
    this.name = name;
    this.type = 'low';
  }
}

class StateFC {
  constructor() {
    this.statesLevel = {
      'global': GlobalStateWare,
      'middle': MiddleStateWare,
      'low': LowStateWare,
    }
  }

  define(type, name) {
    let connection = connect(new this.statesLevel[type](name));
    return [
      connection, (data) => stream.notify(data, connection)
    ];
  }
}

export const defineLowStream = (name) => new StateFC().define('low', name);
export const defineMiddleStream = (name) => new StateFC().define('middle', name);
export const defineGlobalStream = () => new StateFC().define('global', 'global_stream');
