export function proxy(observer) {
  return new Proxy(observer, {
    set(target, prop, value) {
      if (target[prop] === 'type') {
        throw new Error("You cannot change the state type")
      }
      return target[prop] = value;
    },
    deleteProperty() {
      throw new Error("You cannot delete the state keys");
    },
    get(target, prop) {
      return target[prop]
    },
  });
};