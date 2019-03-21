import z from './Z';

class App {
  constructor(props) {
    this.state = props;
    this.state.message = 'world';
    this.addCount = this.addCount.bind(this);
    this.minusCount = this.minusCount.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
  }
  addCount() {
    this.state.count = this.state.count + 1;
  }
  minusCount() {
    this.state.count = this.state.count - 1;
  }
  changeMessage() {
    this.state.message += '!';
  }
  render() {
    return z(
      'div',
      [
        z('span', `count: ${this.state.count}`, {}),
        z('button', '+', {onClick: this.addCount}),
        z('button', '-', {onClick: this.minusCount}),
        z.createComponent(Hello, { message: this.state.message }),
        z('button', 'change', {onClick: this.changeMessage}),
      ],
      {}
    );
  }
}

class Hello {
  constructor(props) {
    this.state = props;
  }
  render() {
    return z('div', `Hello, ${this.state.message}`, {class: 'hello'});
  }
}

z.mount('#app', z.createComponent(App, { count: 0 }));