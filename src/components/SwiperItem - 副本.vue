<template>
    <div class="swiper-item" :style="getSwiperItemStyle">
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
  }
};
</script>

<style scoped>
.swiper-item {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #ccc;
}
</style>
