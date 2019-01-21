/* eslint-disable no-param-reassign */
import Watch from './Watch';

export default function observe(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  Object.keys(data).forEach((key) => {
    data[key] = observe(data[key]);
  });
  const handler = {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const oldVal = target[key];
      const newVal = observe(value);
      Watch.notify(key, newVal, oldVal);
      Reflect.set(target, key, newVal, receiver);
    },
  };
  return new Proxy(data, handler);
}
