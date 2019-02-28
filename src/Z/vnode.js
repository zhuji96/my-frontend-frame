import observe from './observe';

function Vnode(tag, children, attrs) {
  if (typeof children === 'string') {
    return {
      tag: tag,
      text: children,
      attrs: attrs,
    }
  }
}

function fromComponent(component) {
  if (component && component.render) {
    const tree = Object.create(component);
    tree.state = observe(component.state, tree); // clone
    tree.tag = 'component';
    tree.children = tree.render();
    tree.children.id = Math.random();
    return tree;
  }
  return null;
}

Vnode.fromComponent = fromComponent;

export default Vnode;