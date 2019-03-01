import z from './Z';

const App = {
  state: { count: 0 },
  addCount: function() {
    this.state.count = this.state.count + 1;
  },
  minusCount: function() {
    this.state.count = this.state.count - 1;
  },
  render: function() {
    return z(
      'div',
      [
        z('span', `count: ${this.state.count}`, {}),
        z('button', '+', {onClick: this.addCount.bind(this)}),
        z('button', '-', {onClick: this.minusCount.bind(this)}),
      ],
      {}
    );
  }
}

z.mount('#app', App);
z.mount('#app2', App);