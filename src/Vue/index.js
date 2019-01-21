import observe from './observe';
import compile from './compile';
import Watch from './Watch';

export default class Vue {
  constructor(options) {
    if (options.data) {
      this.$data = observe(options.data);
      Watch.setVM(this.$data);
    }
    if (options.el) {
      this.$el = compile(options.el);
    }
  }
}
