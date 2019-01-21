/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import Watch from './Watch';

export default function compile(e) {
  // eslint-disable-next-line no-undef
  const el = document.querySelector(e);
  if (el) {
    const fragment = node2Fragment(el);
    $compile(fragment);
    el.appendChild(fragment);
    return el;
  }
  return null;
}

function $compile({ childNodes }) {
  childNodes.forEach((node) => {
    if (node.childNodes && node.childNodes.length) {
      $compile(node);
    }
    if (isElementNode(node)) {
      console.log(node);
    } else if (isTextNode(node)) {
      $compileText(node);
    }
  });
}

function $compileText(node) {
  const reg = /\{\{\s*(.*)\s*\}\}/;
  const regRes = reg.exec(node.textContent);
  if (regRes) {
    const observer = (newVal, oldVal) => {
      if (newVal !== oldVal) {
        node.textContent = newVal;
      }
    };
    const expression = regRes[1];
    const render = (val) => {
      node.textContent = val;
    };
    Watch.init(expression, render);
    Watch.add(expression, observer);
  }
}

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
