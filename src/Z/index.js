import Vnode from './vnode';
import { mount } from './render';

function z(tag, children, attrs) {
  return Vnode(tag, children, attrs);
}

z.mount = mount;
z.createComponent = Vnode.createComponent;

export default z;

