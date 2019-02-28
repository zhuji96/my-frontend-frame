export default function compile(VnodeTree) {
  let fragment = document.createDocumentFragment();
  if (VnodeTree.tag === 'component') {
    if (VnodeTree.children) {
      fragment = compile(VnodeTree.children);
    }
  }
  if (VnodeTree.tag === 'div') {
    const container = document.createElement(VnodeTree.tag);
    if (VnodeTree.children) {
      const children = compile(VnodeTree.children);
      container.appendChild(children);
    }
    if (VnodeTree.text) {
      container.textContent = VnodeTree.text;
    }
    if (VnodeTree.attrs) {
      if (VnodeTree.attrs.onClick) {
        container.addEventListener('click', VnodeTree.attrs.onClick);
      }
    }
    if (VnodeTree.id) {
      container.id = VnodeTree.id;
    }
    fragment.appendChild(container);
  }
  return fragment;
}
