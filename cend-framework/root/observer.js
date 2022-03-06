class Stream {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(action, state) {
    this.observers.filter((obs) => obs.name === state.name).forEach((obs) => {
      obs.type === state.type && obs.update(action);
    });

    this.observers.filter((obs) => obs.type === 'global').forEach((obs) => {
      obs.update(state.snapshot(state));
    });
  }
}

export class Observer {
  constructor(currentState = undefined) {
    this.currentState = currentState;
  }

  update(value) {
    this.currentState = value;
  }

  clear() { }
}

export const stream = new Stream();
