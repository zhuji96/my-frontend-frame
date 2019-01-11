/* eslint-disable no-param-reassign */
class Dep {
  constructor() {
    this.observers = new Set();
  }

  notify(oldVal, newVal) {
    this.observers.forEach((observer) => {
      observer(oldVal, newVal);
    });
  }

  add(fn) {
    this.observers.add(fn);
  }
}

class Observer {
  constructor(data) {
    this.$dep = new Dep();
    this.$data = this.observe(data);
  }

  update(fn) {
    this.$dep.add(fn);
  }

  observe(data) {
    const that = this;
    if (!data || typeof data !== 'object') {
      return data;
    }
    Object.keys(data).forEach((key) => {
      data[key] = that.observe(data[key]);
    });
    const handler = {
      get(target, key, receiver) {
        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        const oldVal = target[key];
        const newVal = that.observe(value);
        that.$dep.notify(oldVal, newVal);
        Reflect.set(target, key, newVal, receiver);
      },
    };
    return new Proxy(data, handler);
  }
}

module.exports = Observer;
