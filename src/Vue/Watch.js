export default class Watch {
  static setVM(vm) {
    this.VM = vm;
  }

  static init(expression, render) {
    let val = this.VM;
    expression.split('.').forEach((exp) => {
      val = val[exp];
    });
    render(val);
  }

  static add(key, observer) {
    if (key in this.observers) {
      this.observers[key].push(observer);
    } else {
      this.observers[key] = [observer];
    }
  }

  static notify(key, newVal, oldVal) {
    Object.keys(this.observers).forEach((k) => {
      if (k.includes(key)) {
        this.observers[k].forEach((observer) => {
          observer(newVal, oldVal);
        });
      }
    });
  }
}

Watch.observers = {};
