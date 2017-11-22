<template>
  <div class="swiper" :style="swiperStyle" ref="swiper"  @touchstart="touchStart" @touchmove.prevent.stop="touchMove" @touchend="touchEnd">
      <div class="swiper-item" v-for="(item,index) in items" :key="index" :style="getSwiperItemStyle(index)">{{item}}</div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      startX: "",
      startY: "",
      startTime: "",
      el: undefined,
      width: 0,
      height: 0,
      maxWidth: 0,
      minWidth: 0,
      swiperStyle: {},
      curTransform: 0
    };
  },
  props: {
    items: {
      type: Array,
      default: []
    },
    selectIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // swiperStyle() {
    //   return {
    //     left: `${this.selectIndex * this.width}`
    //   };
    // }
  },
  methods: {
    getSwiperItemStyle(index) {
      return {
        left: `${index * 100}%`
      };
    },
    touchStart(event) {
      let touch = event.touches[0];
      this.startX = touch.pageX;
      this.startY = touch.pageY;
      this.startTime = event.timeStamp;
    },
    touchMove(event) {
      let touch = event.touches[0];
      let moveDistance = touch.pageX - this.startX;
      console.log(moveDistance);
      this.setStyle("move", moveDistance);
    },
    touchEnd(event) {
      let touch = event.changedTouches[0];
      let moveDistance = touch.pageX - this.startX;
      this.setStyle("end", moveDistance);
    },
    setStyle(type, move, time = 1000) {
      let posX = this.curTransform + move;
      if (type === "move") {
        posX = Math.min(this.minWidth, Math.max(this.maxWidth, posX));
        this.swiperStyle = {
          transition: "",
          transform: `translate3d(${posX}px,0,0)`
        };
      } else if (type === "end") {
        posX = Math.round(posX / this.width) * this.width;
        posX = Math.min(0, Math.max(this.maxWidth, posX));
        this.swiperStyle = {
          transition: `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`,
          transform: `translate3d(${posX}px,0,0)`
        };
        this.curTransform = posX;
        console.log("end-->", posX, "index--->", Math.abs(posX) / this.width);
      }
    }
  },
  mounted() {
    let swiper = this.$refs.swiper;
    let { width, height } = window.getComputedStyle(swiper);
    this.el = swiper;
    this.width = parseInt(width);
    this.height = parseInt(height);
    this.maxWidth = -this.width * (this.items.length - 1);
    this.minWidth = 0;
  }
};
</script>

<style lang="css" scoped>
.swiper {
  position: relative;
  width: 100%;
  height: 100%;
}
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
