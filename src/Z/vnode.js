import observe from './observe';
import { clone } from '../utils';

function Vnode(tag, children, attrs) {
  if (typeof children === 'string') {
    return {
      tag: tag,
      text: children,
      attrs: attrs,
    }
  }
  if (Array.isArray(children)) {
    return {
      tag: tag,
      children: children,
      attrs: attrs,
    }
  }
}

function fromComponent(component) {
  if (component && component.render) {
    const tree = Object.create(component);
    const stateClone = clone(component.state);
    tree.state = observe(stateClone, tree);
    tree.tag = 'component';
    tree.children = tree.render();
    tree.children.id = Math.random();
    return tree;
  }
  return null;
}

Vnode.fromComponent = fromComponent;

export default Vnode;