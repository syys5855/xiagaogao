<template>

</template>

<script>
import _ from "lodash";
console.clear();
const UPDATE_TYPE = {
  REPLACE: "REPLACE",
  REORDER: "REORDER",
  PROPS: "PROPS",
  TEXT: "TEXT",
  INSERT: "INSERT",
  REMOVE: "REMOVE"
};

class Vnode {
  constructor(tagName, props = {}, children = []) {
    Object.assign(this, {
      tagName,
      props,
      children
    });
  }
  render() {
    const el = document.createElement(this.tagName);

    // 添加子节点
    _.forEach(this.children, child => {
      let childEl;
      // 属于Vnode
      if (child instanceof Vnode) {
        childEl = child.render();
      } else {
        childEl = document.createTextNode(child);
      }
      el.appendChild(childEl);
    });

    // 添加属性
    _.chain(this.props)
      .entries()
      .forEach(([propName, propValue]) => {
        el.setAttribute(propName, propValue);
      })
      .value();
    return el;
  }
}

const flat = children => {
  const result = {};
  _.forEach(children, (child, index) => {
    result[index] = child;
  });
  return result;
};

const destroy = node => {
  node = null;
};

const diff = (oldNode, newNode, diffQueue) => {
  // 判断是不是属于同一个组件
  if (newNode.tagName !== oldNode.tagName) {
    diffQueue.push({
      type: UPDATE_TYPE.REPLACE,
      newVal: newNode,
      oldVal: oldNode
    });
  } else {
    // props
    if (!_.isEqual(newNode.props, oldNode.props)) {
      diffQueue.push({
        type: UPDATE_TYPE.PROPS,
        newVal: newNode.props,
        oldVal: oldNode.props
      });
    }

    // children
    const newFlat = flat(newNode.children);
    const oldFlat = flat(oldNode.children);
    _.each(newFlat, (val, key) => {
      if (val instanceof Vnode) {
        // 两者都是Node
        if (oldFlat[key] instanceof Vnode) {
          diff(oldFlat[key], val, diffQueue);
        } else {
          _.isNil(oldFlat[key])
            ? diffQueue.push({
                type: UPDATE_TYPE.INSERT,
                newVal: val,
                oldVal: oldFlat[key]
              })
            : diffQueue.push({
                type: UPDATE_TYPE.REPLACE,
                newVal: val,
                oldVal: oldFlat[key]
              });
        }
      } else {
        if (!(oldFlat[key] instanceof Vnode)) {
          val !== oldFlat[key] &&
            diffQueue.push({
              type: UPDATE_TYPE.TEXT,
              newVal: val,
              oldVal: oldFlat[key]
            });
        } else {
          _.isNil(val)
            ? diffQueue.push({
                type: UPDATE_TYPE.REMOVE,
                newVal: null,
                oldVal: oldFlat[key]
              })
            : diffQueue.push({
                type: UPDATE_TYPE.REPLACE,
                newVal: val,
                oldVal: oldFlat[key]
              });
        }
      }
    });
 
    // 移除新结构中不存在的
    _.each(oldFlat, (val, key) => {
      if (!newFlat.hasOwnProperty(key)) {
        diffQueue.push({
          type: UPDATE_TYPE.REMOVE,
          newVal: null,
          oldVal: oldFlat[key]
        });
      }
    });
    return diffQueue;
  }
};

let node1 = new Vnode("ul", { class: "list-group" }, [
  new Vnode('li',{class:'list-group-item item0'},['item0']),
  new Vnode("li", { class: "list-group-item item1" }, [
    "item1",
    new Vnode("a", { href: "baidu.com" }, ["baidu"])
  ]),
  new Vnode("li", { class: "list-group-item item2" }, ["item2"]),
  new Vnode("li", { class: "list-group-item item3" }, [
    "item3",
    new Vnode("a", { class: "list-group-item item5" }, ["item9"])
  ]),
  new Vnode("a", { class: "list-group-item item5", href: "sina.com" }, [
    "sina"
  ]),
  new Vnode("div", { class: "list-group-item item5" }, ["item5"])
]);

let node2 = new Vnode("ul", { class: "list-group" }, [
  new Vnode('li',{class:'list-group-item item0'},['item0']),
  new Vnode("li", { class: "list-group-item item1" }, ["item1"]),
  new Vnode("li", { class: "list-group-item item2" }, ["item2.1"]),
  new Vnode("li", { class: "list-group-item item3" }, [
    "item3",
    new Vnode("a", { class: "list-group-item item5" }, ["item9"]),
    new Vnode("a", { class: "list-group-item item2", href: "www.baidu.com" }, ["baidu"])
  ]),
  new Vnode("a", { class: "list-group-item item5", href: "sina.cn" }, ["sina"])
]);

window.node1 = node1;
window.node2 = node2;

console.log(diff(node1, node2, []));
// console.log(node1, node2);

export default {};
</script>

<style>

</style>
