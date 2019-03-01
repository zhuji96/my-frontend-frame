import compile from "./compile";

function render(instance) {
  console.log(instance);
  const el = document.getElementById(''+instance.children.id);
  const parent = el.parentNode;
  const fragment = compile(instance.render());
  fragment.firstChild.id = instance.children.id;
  parent.insertBefore(fragment, el);
  parent.removeChild(el);
}

export default render;
