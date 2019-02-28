import Vnode from './vnode';
import mount from './mount';

function z(tag, children, attrs) {
  return Vnode(tag, children, attrs);
}

z.mount = mount;

export default z;

