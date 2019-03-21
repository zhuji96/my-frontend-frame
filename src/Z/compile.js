export default function compile(VnodeTree) {
  let fragment = document.createDocumentFragment();
  if (Array.isArray(VnodeTree)) {
    VnodeTree.forEach(vnode => fragment.appendChild(compile(vnode)))
    return fragment;
  }
  // if (VnodeTree.tag === 'component') {
  //   if (VnodeTree.children) {
  //     fragment = compile(VnodeTree.children);
  //   }
  //   return fragment;
  // }
  if (['div', 'span', 'button'].includes(VnodeTree.tag)) {
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
    fragment.appendChild(container);
    return fragment;
  }
  return fragment;
}
