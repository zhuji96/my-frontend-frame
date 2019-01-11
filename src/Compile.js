/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    // eslint-disable-next-line no-undef
    this.$el = document.querySelector(el);
    if (this.$el) {
      this.$fragment = node2Fragment(this.$el);
      this.compile(this.$fragment);
      this.$el.appendChild(this.$fragment);
    }
  }

  compile({ childNodes }) {
    const that = this;
    childNodes.forEach((node) => {
      if (node.childNodes && node.childNodes.length) {
        that.compile(node);
      }
      if (isElementNode(node)) {
        that.compileElement(node);
      } else if (isTextNode(node)) {
        that.compileText(node);
      }
    });
  }

  compileElement(node) {
    const nodeAttrs = node.attributes;
    console.log(nodeAttrs, this.$vm);
  }

  compileText(node) {
    const reg = /\{\{\s*(.*)\s*\}\}/;
    const regRes = reg.exec(node.textContent);
    if (regRes) {
      node.textContent = getVMVal(this.$vm, regRes[1]);
    }
  }
}

module.exports = Compile;

function node2Fragment(el) {
  // eslint-disable-next-line no-undef
  const fragment = document.createDocumentFragment();
  let child = el.firstChild;
  while (child) {
    fragment.appendChild(child);
    child = el.firstChild;
  }
  return fragment;
}

function isElementNode(node) {
  return node.nodeType === 1;
}

function isTextNode(node) {
  return node.nodeType === 3;
}

function getVMVal(vm, expression) {
  let val = vm;
  expression.split('.').forEach((exp) => {
    val = val[exp];
  });
  return val;
}
