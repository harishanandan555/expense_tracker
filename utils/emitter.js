import { EventEmitter } from 'react-native';

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event, fn) => eventEmitter.addListener(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.removeListener(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};

Object.freeze(Emitter);

export default Emitter;