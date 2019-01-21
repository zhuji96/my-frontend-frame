import Vue from './Vue';

const app = new Vue({
  el: '#app',
  data: { name: { first: 'zhu' } },
});
// eslint-disable-next-line no-undef
window.app = app;
