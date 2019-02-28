/* eslint-disable no-param-reassign */
import render from './render';

export default function observe(data, instance) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  Object.keys(data).forEach((key) => {
    data[key] = observe(data[key], instance);
  });
  const handler = {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      // const oldVal = target[key];
      const newVal = observe(value, instance);
      Reflect.set(target, key, newVal, receiver);
      render(instance); // to update
      return true;
    },
  };
  return new Proxy(data, handler);
}
