import { moveInArray } from '../utils';

export default function diff(oldTree, newTree) {
  // 记录差异
  let patches = {};
  dfs(oldTree, newTree, 0, patches);
  return patches;
}

function dfs(oldNode, newNode, index, patches) {
  // 用于保存子树的更改
  let curPatches = [];
  // 需要判断三种情况
  // 1.没有新的节点，那么什么都不用做
  // 2.新的节点的 tagName 和 `key` 和旧的不同，就替换
  // 3.新的节点的 tagName 和 key（可能都没有） 和旧的相同，开始遍历子树
  if (!newNode) {
  } else if (newNode.tag === oldNode.tag && newNode.key === oldNode.key) {
    // 判断属性是否变更
    let attrs = diffAttrs(oldNode.attrs, newNode.attrs);
    if (attrs.length) {
      curPatches.push({ type: 'ChangeAttrs', payload: { attrs: attrs } });
    }
    // 遍历子树
    diffChildren(oldNode.children, newNode.children, index, patches);
  } else {
    // 节点不同，需要替换
    curPatches.push({ type: 'Replace', payload: { node: newNode } });
  }

  if (curPatches.length) {
    if (patches[index]) {
      patches[index] = patches[index].concat(curPatches);
    } else {
      patches[index] = curPatches;
    }
  }
}

function diffAttrs(oldAttrs, newAttrs) {
  // 判断 attrs 分以下三步骤
  // 先遍历 oldattrs 查看是否存在删除的属性
  // 然后遍历 newattrs 查看是否有属性值被修改
  // 最后查看是否有属性新增
  let changes = [];
  for (const key in oldAttrs) {
    if (oldAttrs.hasOwnProperty(key) && !newAttrs[key]) {
      changes.push({
        key: key,
        value: null,
      });
    }
  }
  for (const key in newAttrs) {
    if (newAttrs.hasOwnProperty(key)) {
      if (oldAttrs[key] && oldAttrs[key] !== newAttrs[key]) {
        changes.push({
          key: key,
          value: newAttrs[key]
        });
      } else if (!oldAttrs[key]) {
        changes.push({
          key: key,
          value: newAttrs[key]
        });
      }
    }
  }
  return changes;
}

function diffList(oldList, newList, index, patches) {
  function getKeys(list) {
    let keys = [];
    if (!list) return keys;
    list.forEach(item => {
      // TODO: item is string
      keys.push(item.key);
    })
    return keys;
  }
  
  let newKeys = getKeys(newList);
  let changes = [];

  // 用于保存变更后的节点数据
  // 使用该数组保存有以下好处
  // 1.可以正确获得被删除节点索引
  // 2.交换节点位置只需要操作一遍 DOM
  // 3.用于 `diffChildren` 函数中的判断，只需要遍历
  // 两个树中都存在的节点，而对于新增或者删除的节点来说，完全没必要
  // 再去判断一遍
  let list = [];
  oldList &&
    oldList.forEach((item, index) => {
      let key = item.key;
      // 寻找新的 children 中是否含有当前节点
      // 没有的话需要删除
      let indexInNew = newKeys.indexOf(key);
      if (indexInNew === -1) {
        changes.push({
          type: 'Remove',
          payload: { index: index }
        });
      } else {
        list.push(key);
      }
    })

  // 遍历新的 list，判断是否有节点新增或移动
  // 同时也对 `list` 做节点新增和移动节点的操作
  newList &&
    newList.forEach((item, index) => {
      let key = item.key;
      // 寻找旧的 children 中是否含有当前节点
      let indexInOld = list.indexOf(key);
      // 没找到代表新节点，需要插入
      if (indexInOld === -1 || key === null) {
        changes.push({
          type: 'Insert',
          payload: {
            node: item,
            index: index
          }
        });
        list.splice(index, 0, key);
      } else {
        // 找到了，需要判断是否需要移动
        if (index !== indexInOld) {
          changes.push({
            type: 'Move',
            payload: {
              from: indexInOld,
              to: index
            }
          });
          list = moveInArray(list, indexInOld, index);
        }
      }
    })
  return { changes, list };
}

function diffChildren(oldChildren, newChildren, index, patches) {
  let { changes, list } = diffList(oldChildren, newChildren, index, patches);
  if (changes.length) {
    if (patches[index]) {
      patches[index] = patches[index].concat(changes);
    } else {
      patches[index] = changes;
    }
  }
  // 记录上一个遍历过的节点
  let last = null;
  oldChildren &&
    oldChildren.forEach(item => {
      if (item && item.children) {
        index =
          last && last.children ? index + last.children.length + 1 : index + 1;
        let keyIndex = list.indexOf(item.key);
        let node = newChildren[keyIndex];
        // 只遍历新旧中都存在的节点，其他新增或者删除的没必要遍历
        if (node) {
          dfs(item, node, index, patches);
        }
      } else {
        index += 1;
      }
      last = item;
    })
}