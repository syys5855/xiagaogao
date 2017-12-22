<template>
  <swiper :options="swiperOption"  ref="mySwiper" style="height:200px;border:1px solid #ccc;">
    <!-- slides -->
    <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
  </swiper>
</template>

<script>
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.hahaha=function(){
    console.log('hahaha');
  }
}
Person.prototype.say = function() {
  console.log(`my name is ${this.name}, i am ${this.age} years old`);
};

function Student(name, age, cls) {
  Person.call(this, name, age);
  this.cls = cls;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.hi = function() {
  // js 的ji'ch
  console.log(`i am in class ${this.cls}`);
};

export default {
  data() {
    return {
      swiperOption: {
        autoPlay: 0,
        loop: true
      }
    };
  }
};
</script>

<style>

</style>
