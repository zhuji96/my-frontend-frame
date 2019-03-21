import watch from './watch';

function Vnode(tag, children, attrs, key) {
  if (typeof children === 'string') {
    return {
      tag: tag,
      text: children,
      attrs: attrs,
      children: null,
      key: key || children
    }
  }
  if (Array.isArray(children)) {
    return {
      tag: tag,
      text: null,
      attrs: attrs,
      children: children,
      key: key || children.map(item => item.tag).join('')
    }
  }
}

function createComponent(componentName, props) {
  try {
    const component = new componentName(props);
    console.log(component)
    watch(component);
    return component;
  }
  catch(err) {
    console.log(err)
  }
}

Vnode.createComponent = createComponent;

export default Vnode;