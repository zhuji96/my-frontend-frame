const Observer = require('./Observer');
const Compile = require('./Compile');

const data = { name: { first: 'zhu' } };
const vm = new Observer(data);
vm.update((oldVal, newVal) => {
  if (oldVal === newVal) {
    return;
  }
  console.log(oldVal, ' -> ', newVal);
});
vm.$data.name.first = 'ji';
// eslint-disable-next-line no-undef
window.vm = vm.$data;
// eslint-disable-next-line no-unused-vars
const c = new Compile('#app', vm.$data);
