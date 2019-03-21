import patch from "./patch";
import diff from "./diff";
import compile from './compile';

export default function mount(query, component) {
  const el = document.querySelector(query);
  if (el) {
    let vnodeTree = component.render();
    component.__vnode = vnodeTree;
    component.__parent = el;
    const fragment = compile(vnodeTree);
    el.appendChild(fragment);
  }
  return null;
}

function update() {
  const newTree = this.render();
  const oldTree = this.__vnode;
  const patches = diff(oldTree, newTree);
  console.log(patches);
  patch(this.__parent.childNodes[0], patches, 0);
  this.__vnode = newTree;
}

export {
  mount,
  update
};
