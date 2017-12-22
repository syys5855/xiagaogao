<template>
    <div style="margin:10px;">
        <!-- <loading></loading> -->
       
    </div>
</template>

<script>
function decorateArmour(target, key, descriptor) {
  const method = descriptor.value;
  let moreDef = 100;

  descriptor.value = (...args) => {
    args[0] += moreDef;
    return method.apply(target, args);
  };
  return descriptor;
}

function decorateAtk(target, key, descriptor) {
  const method = descriptor.value,
    moreAtk = 100;

  descriptor.value = (...args) => {
    args[1] += moreAtk;
    return method.apply(target, args);
  };
  return descriptor;
}

function decorateFly(target) {
  let toString = target.prototype.toString;
  target.prototype.toString = (...args) => {
    return toString.apply(target.prototype, args) + ",(skill fly)";
  };
  return target;
}

function log(tips) {
  return (target, key, descriptor) => {
    const method = descriptor.value;
    let rst;
    descriptor.value = (...args) => {
      console.log(`${tips}`);
      try {
        rst = method.apply(target, args);
        console.log(`${tips} exec success`);
      } catch (err) {
        console.log(`${tips} exec err`);
      }
      return rst;
    };
    return descriptor;
  };
}

@decorateFly
class Man {
  constructor(def = 2, atk = 2, hp = 3) {
    this.init(def, atk, hp);
  }

  @decorateArmour
  @decorateAtk
  init(def, atk, hp) {
    this.def = def;
    this.atk = atk;
    this.hp = hp;
  }
  toString() {
    return `def:${this.def},atk:${this.atk},hp:${this.hp}`;
  }

  @log("beforeCheck:")
  check() {
    return "check done";
  }

  @log("beforeAttck:")
  attack() {
    return "attck";
  }

  @log("tipsError:")
  error() {
    throw "something error";
  }
}

let John = new Man();
// console.log(John.toString());

John.attack();
John.error();
John.check();
// import Loading from "@/components/loading";


// 使用语法糖实现
function ACDecorator(target) {
  let proto = target.prototype;
  let start = proto.start;
  proto.start = (...args) => {
    start.apply(proto, args);
    console.log("冷风吹起来");
  };
}

function PowerLocksDecorator(target) {
  let proto = target.prototype;
  let driver = proto.driver;
  proto.driver = (...args) => {
    console.log("车门自动上锁");
    driver.apply(proto, args);
  };
}

@ACDecorator
@PowerLocksDecorator
class Car {
  constructor() {}
  start() {
    console.log("伴随着引擎的轰鸣声，车子发动了!");
  }
  driver() {
    console.log("走起!");
  }
}

let car = new Car();
car.start();
car.driver();


// 原生实现 装饰器
function Moto() {
  console.log("装配 Moto");
}

Moto.prototype.start = function() {
  console.log("启动引擎");
};

Moto.prototype.driver = function() {
  console.log("gogogo!");
};

// moto 装饰器
function MotoDecorator(moto) {
  this.moto = moto;
}
MotoDecorator.prototype.start = function() {
  this.moto.start();
};

MotoDecorator.prototype.driver = function() {
  this.moto.driver();
};

function ACMotoDC(moto) {
  MotoDecorator.call(this, moto);
}
ACMotoDC.prototype = new MotoDecorator();
ACMotoDC.prototype.constructor = new MotoDecorator();

ACMotoDC.prototype.start = function() {
  this.moto.start();
  console.log("wuwuwuwu");
};

function DRMotoDC(moto) {
  MotoDecorator.call(this, moto);
}
DRMotoDC.prototype = new MotoDecorator();
DRMotoDC.prototype.driver = function() {
  this.moto.driver();
  console.log("23333");
};

let moto = new Moto();
moto = new ACMotoDC(moto);
moto = new DRMotoDC(moto);

moto.start();
moto.driver();


export default {
  //   components: { Loading }
};
</script>
