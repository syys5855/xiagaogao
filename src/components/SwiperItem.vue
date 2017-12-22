<template>
    <div class="my-swiper-item" ref="swiperItem" :style="getSwiperItemStyle">
        <slot></slot>
    </div>
</template>
<script>
export default {
  props: ["swiperItemIndex"],
  computed: {
    getSwiperItemStyle() {
      return {
        left: `${this.swiperItemIndex * 100}%`
      };
    }
  },
  mounted(){
  }
};
</script>

<style scoped>
.my-swiper-item {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #ccc;
  flex-shrink:0;
  box-sizing: border-box;
}

</style>
