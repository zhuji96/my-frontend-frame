import z from './Z';

class App {
  constructor(props) {
    this.state = props;
    this.addCount = this.addCount.bind(this);
    this.minusCount = this.minusCount.bind(this);
  }
  addCount() {
    this.state.count = this.state.count + 1;
  }
  minusCount() {
    this.state.count = this.state.count - 1;
  }
  render() {
    return z(
      'div',
      [
        z('span', `count: ${this.state.count}`, {}),
        z('button', '+', {onClick: this.addCount}),
        z('button', '-', {onClick: this.minusCount}),
      ],
      {}
    );
  }
}

z.mount('#app', z.createComponent(App, { count: 0 }));
z.mount('#app2', z.createComponent(App, { count: 0 }));
// z.mount('#app', App);
// z.mount('#app2', App);