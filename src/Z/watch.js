import { update } from './render';

export default function watch(component) {
  component.state = observe(component.state, component);
}

function observe(data, component) {
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
      // const oldVal = target[key];
      const newVal = observe(value);
      Reflect.set(target, key, newVal, receiver);
      update.call(component); // to update
      return true;
    },
  };
  return new Proxy(data, handler);
}
