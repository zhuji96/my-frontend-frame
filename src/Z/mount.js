import compile from './compile';
import Vnode from './vnode';

export default function mount(query, component) {
  const el = document.querySelector(query);
  if (el) {
    const vnodeTree = Vnode.fromComponent(component);
    const fragment = compile(vnodeTree);
    el.appendChild(fragment);
  }
  return null;
}