<template>
  <swiper :options="swiperOption"  ref="mySwiper" style="height:200px;border:1px solid #ccc;">
    <!-- slides -->
    <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
  </swiper>
</template>

<script>
export default {
  data(){
    return {
      swiperOption:{
        autoPlay:0,
        loop:true
      }
    }
  }
}
</script>

<style>

</style>
