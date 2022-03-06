import { stream } from './root/observer.js';
import { MiddleWare, LowWare } from './wares/ware.js';
import { connect } from './connector/decorator.js';
import { GlobalWare } from './wares/global.js';

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
    const connection = connect(new this.statesLevel[type](name));
    return [
      connection, (data) => stream.notify(data, connection)
    ];
  }
}

export const defineGlobalStream = () => new StateFC().define('global', 'global_stream');
export const defineMiddleStream = (name) => new StateFC().define('middle', name);
export const defineLowStream = (name) => new StateFC().define('low', name);
