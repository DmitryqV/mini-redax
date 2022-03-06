import { stream } from '../root/observer.js';
import { proxy } from './proxy.js';

export function connect(observer) {
  const checkUniqName = stream.observers.filter((obs) => obs.name === observer.name);

  if (checkUniqName.length > 0) {
    throw new Error(`The name ${observer.name} is already taken!!!!`);
  }

  if (observer.name.trim().length === 0) {
    throw new Error('The name is empty!!!!');
  }

  observer.snapshot = function () {
    return { ...observer };
  }

  stream.subscribe(observer);
  stream.notify(observer.currentState, observer);

  return proxy(observer);
}