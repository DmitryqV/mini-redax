import { StateFactory } from './patterns/factory.js';

/** CONNECT TO APP STREAM **/
const [globalState, setGlobalState] = StateFactory.create('global', 'global_stream'); /** GLOBAL STREAM  **/
const [middleState, setMiddleState] = StateFactory.create('middle', 'middle_stream'); /** MID STREAM  **/
const [state, setState] = StateFactory.create('low', 'low_stream'); /** LOW STREAM  **/

setState({ message: 'hello low state 1!' });
console.log(state, '\n\n');

setState({ message: 'hello low state 2!' });
console.log(state, '\n\n');

setState(state.lowStateList[0]);
console.log(state, '\n\n');

setState({ message: 'hello low state 1!' });
console.log(state.snapshot(), '\n\n');

setMiddleState({ message: 'hello middle state!' });
console.warn(middleState, '\n\n');

setMiddleState({ message: 'hello middle state 1!' });
console.warn(middleState.snapshot(), '\n\n');

setMiddleState({ message: 'hello middle state! 2' });
console.warn(middleState.clear(), '\n\n');

setState('lalalallal');
console.log(state.snapshot(), '\n\n');

setState(13212312312);
console.log(state.snapshot(), '\n\n');

console.error(globalState, '\n\n');

setTimeout(() => {
  globalState.clear();
  console.error(globalState, '\n\n');
}, 5000);