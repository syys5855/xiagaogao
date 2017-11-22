<template>
  <div style="height:200px;border:1px solid red;">
    <my-swiper>
      <my-swiper-item style="background:#f8bbd0; color:white;">1</my-swiper-item>
      <my-swiper-item style="background:#2196f3; color:white;">2</my-swiper-item>
      <my-swiper-item style="background:#ce93d8; color:white;">3</my-swiper-item>
      <my-swiper-item style="background:#f44336; color:white;">4</my-swiper-item>
      <my-swiper-item style="background:#7c4dff; color:white;">5</my-swiper-item>
    </my-swiper>
  </div>
</template>

<script>
import MySwiper from "@/components/Swiper.js";
import MySwiperItem from "@/components/SwiperItem";

export default {
  components: { MySwiperItem, MySwiper },
  data() {
    return {
      swiperOption: {
        autoPlay: 0,
        loop: true
      }
    };
  },
  mounted(){
    console.log(this);
  }
};
</script>

<style>

</style>
