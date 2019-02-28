import compile from "./compile";
import Vnode from "./vnode";

// export default {
//   observers: {},

//   add: function(key, observer) {
//     if (key in this.observers) {
//       this.observers[key].push(observer);
//     } else {
//       this.observers[key] = [observer];
//     }
//   },

//   notify: function(key, newVal, oldVal) {
//     Object.keys(this.observers).forEach((k) => {
//       if (k === key) {
//         this.observers[k].forEach((observer) => {
//           observer(newVal, oldVal);
//         });
//       }
//     });
//   }
// }

function render(instance) {
  const el = document.getElementById(''+instance.children.id);
  const parent = el.parentNode;
  parent.innerHTML = '';
  const fragment = compile(instance.render());
  parent.appendChild(fragment);
  parent.firstChild.id = instance.children.id;
}

export default render;
