import compile from "./compile";

export default function patch(node, patches, index) {
  let changes = patches[index];
  let childNodes = node && node.childNodes;
  // 这里的深度遍历和 diff 中是一样的
  if (changes && changes.length) {
    changeDom(node, changes);
  }
  let last = null;
  if (childNodes && childNodes.length) {
    childNodes.forEach((item, i) => {
      index =
        last && last.children ? index + last.children.length + 1 : index + 1;
      patch(item, patches, index);
      last = item;
    })
  } else {
    index += 1;
  }
}

function changeDom(node, changes) {
  changes &&
    changes.forEach(change => {
      let { type, payload } = change;
      switch (type) {
        case 'ChangeAttrs':
          payload.attrs.forEach(item => {
            if (item.value) {
              node.setAttribute(item.key, item.value);
            } else {
              node.removeAttribute(item.key);
            }
          })
          break
        case 'Remove':
          node.childNodes[payload.index].remove();
          break
        case 'Insert':
          let dom = compile(payload.node);
          node.insertBefore(dom, node.childNodes[payload.index]);
          break
        case 'Replace':
          node.parentNode.replaceChild(compile(payload.node), node);
          break
        case 'Move':
          let fromNode = node.childNodes[payload.from];
          let toNode = node.childNodes[payload.to];
          let cloneFromNode = fromNode.cloneNode(true);
          let cloenToNode = toNode.cloneNode(true);
          node.replaceChild(cloneFromNode, toNode);
          node.replaceChild(cloenToNode, fromNode);
          break
        default:
          break
      }
    })
}