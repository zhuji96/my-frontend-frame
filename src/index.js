// import Vue from './Vue';

// const app = new Vue({
//   el: '#app',
//   data: { name: { first: 'zhu' } },
// });
// // eslint-disable-next-line no-undef
// window.app = app;
import z from './Z';

const App = {
  state: { count: 0 },
  handleClick: function() {
    let { count } = this.state;
    console.log(count);
    this.state.count = this.state.count + 1;
  },
  render: function() {
    return z('div', `count: ${this.state.count}`, { onClick: this.handleClick.bind(this) } );
  }
}

z.mount('#app', App);