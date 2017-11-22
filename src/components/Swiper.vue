<template>
    <div class="swiper" :style="swiperStyle" ref="swiper"  @touchstart="touchStart" @touchmove.prevent.stop="touchMove" @touchend="touchEnd">
        <!-- <div class="swiper-item" v-for="(item,index) in renderData" :key="index" :style="getSwiperItemStyle(item.index)">{{item.data}}</div> -->
        <swiper-item v-for="(item,index) in renderData" :key="index" :swiper-item-index="item.index">
            {{item.data}}
        </swiper-item>
    </div>
</template>

<script>
import _ from "lodash";
import SwiperItem from "@/components/SwiperItem";
export default {
  components: { SwiperItem },
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
      curTransform: 0,
      swiper: {
        start: -1,
        end: 1,
        interval: 2
      },
      activeIndex: 0
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
    },
    isLoop: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    renderData() {
      if (!this.isLoop) {
        return this.items.map((item, index) => {
          return {
            data: item,
            index
          };
        });
      } else {
        let swiperItems = [];
        for (let i = this.swiper.start; i <= this.swiper.end; i++) {
          let data = this.getSwiperData(i);
          swiperItems.push({
            data,
            index: i
          });
        }
        return swiperItems;
      }
    },
    index() {
      let i = this.activeIndex % this.items.length;
      return i >= 0 ? i : this.items.length + i;
    }
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
        posX = this.isLoop ? posX : Math.min(0, Math.max(this.maxWidth, posX));
        this.swiperStyle = {
          transition: "",
          transform: `translate3d(${posX}px,0,0)`
        };
      } else if (type === "end") {
        posX = Math.round(posX / this.width) * this.width;
        posX = this.isLoop ? posX : Math.min(0, Math.max(this.maxWidth, posX));
        this.swiperStyle = {
          transition: `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`,
          transform: `translate3d(${posX}px,0,0)`
        };
        this.curTransform = posX;
        this.activeIndex = -posX / this.width;
        console.log("end-->", posX, "index--->", this.activeIndex);
        this.swiper.start = this.activeIndex - 1;
        this.swiper.end = this.swiper.start + this.swiper.interval;
      }
    },
    getSwiperData(index) {
      index = index % this.items.length;
      return this.items[
        index >= 0 ? index % this.items.length : index + this.items.length
      ];
    }
  },
  created() {
    this.activeIndex = this.selectIndex;
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
</style>
