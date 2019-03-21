import compile from './compile';
import { setRootComponent, setOld, setRootDOM } from './store';

export default function mount(query, component) {
  const el = document.querySelector(query);
  if (el) {
    setRootDOM(el);
    setRootComponent(component);
    let vnodeTree = component.render();
    setOld(vnodeTree);
    const fragment = compile(vnodeTree);
    el.appendChild(fragment);
    return {
      rootDOM: el.childNodes[0],
      rootComponent: component,
      oldTree: vnodeTree
    }
  }
  return null;
}