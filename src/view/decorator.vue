<template>
    <h1>decorator</h1>
</template>

<script>
// 原生的实现
function performanceDecorator(func) {
  return function(...params) {
    console.time("start");
    func(...params);
    console.timeEnd("start");
  };
}

function testFun() {
  for (let i = 0; i < 10000; i++) {
    console.log(i);
  }
}
// performanceDecorator(testFun)();

// 使用es decorator
// 1. 实例的方法
function performanceDecorator2(...args) {
  return (target, key, descriptor) => {
        let method = descriptor.value;
        descriptor.value= (...params)=>{
            console.time('startDesc2');
            method(...params);
            console.timeEnd('startDesc2');
        }
        return descriptor;
    };
}

class Test{
    @performanceDecorator2()
    testFun2(endFlag) {
        for(let i=0;i<1000;i++);
        console.log(endFlag);
    }
}

new Test().testFun2('end hahahah');

// 修饰class
// 只接一个方法,构造的函数
function performanceDecorator3(...args){
    return (target)=>{
        console.log(target);
        target.prototype.test=function(){
            console.log('test...');
        }
    }
}

@performanceDecorator3()
class Test2{

}
new Test2().test();




export default {};
</script>

<style>

</style>
