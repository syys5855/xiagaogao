<template>
    <h1>mvvm</h1>
</template>

<script>
let data = { name: "syys", age: 23 };

function observer(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

// 为每一个属性的值添加 get set的访问器
function defineReactive(data, key, val) {
  const dep = new Dep();
  // 对子节点添加get set 访问器
  observer(val);
  Object.defineProperty(data, key, {
    get() {
      Dep.target && dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      console.log(`newVal is ${newVal} oldVal is ${val}`);
      val = newVal;
      observer(val);
      dep.notify();
    }
  });
}

// 定义 get set 的id 
let depId = 0;

class Dep {
  constructor() {
    this.subs = [];
    this.id = depId++;
  }
  depend() {
    Dep.target.addDep(this);
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}
Dep.target = null;

class Watcher {
  constructor(vm, exp, cb) {
    Object.assign(this, {
      vm,
      exp,
      cb,
      depIds: {}
    });
    this.value = this.get();
  }
  update() {
    // 会触发 dep 的getter 进而 触发addDep 需要判断这个watcher 已经在 dep中
    this.value = this.get();
    this.cb("update");
  }
  // 判断当前的watcher 是不是已经在这个属性Dep（set get）的订阅这种
  addDep(dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      this.depIds[dep.id] = dep.id;
      dep.addSub(this);
    }
  }
  get() {
    Dep.target = this;
    // 触发get 添加订阅者
    const val = this.vm[this.exp];
    Dep.target = null;
    return val;
  }
}

observer(data);

const w = new Watcher(data, "name", console.log);
const w2 = new Watcher(data, "age", () => {
  console.log("hahhaha");
});

window.data = data;
export default {};
</script>

<style>

</style>
