<template>
  <div>
    <h1>hello world</h1>
    
    <div style="height:30px; width:100px;position:absolute;border:1px solid #000;top:130px;left:112px;"></div>
    <div class="select" ref="select" :style="selectStyle">
      <div class="select-item" v-for="item in getItems" :style="item.style">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectStyle: {},
      startX: "",
      startY: "",
      endX: "",
      endY: "",
      curDeg: 0
    };
  },
  computed: {
    getItems() {
      let index = 0;
      let items = Array.from({ length: 9 }, () => `item ${index++}`);

      let per = 180 / items.length;

      return items.map((item, index) => {
        return {
          text: item,
          style: {
            transform: `rotate3d(1,0,0,${-index *
              per}deg) translate3d(0,0,100px)`
            // zIndex: items.length - index
          }
        };
      });
    }
  },
  mounted() {
    this.$el.addEventListener("touchstart", this.touchStart, false);
    this.$el.addEventListener("touchend", this.touchEnd, false);
    this.$el.addEventListener("touchmove", this.touchMove, false);
  },
  methods: {
    touchStart(event) {
      console.log("start-->", event);
      let touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },
    touchMove(event) {
      let touch = event.touches[0];
      let margin = touch.clientY - this.startY;
      if (Math.abs(margin) < 20) {
        return;
      }
      let endDeg = Math.round(margin / 20) * 20;
      this.selectStyle = {
        transform: `rotateX(${-endDeg}deg)`
      };
    },
    touchEnd(event) {
      let touch = event.changedTouches[0];
      let margin = touch.clientY - this.startY;
      if (Math.abs(margin) < 20) {
        return;
      }
      let endDeg = Math.round(margin / 20) * 20;
      this.selectStyle = {
        transform: `rotateX(${-endDeg}deg)`
      };
      this.curDeg = endDeg;
    }
  }
};
</script>

<style scoped>
.select {
  width: 100px;
  height: 30px;
  /* border: 1px solid #ccc; */
  margin: 100px auto;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center;
  transform: rotateX(60deg);
  transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
}
.select-item {
  position: absolute;
  height: 30px;
  left: 0;
  top: 0;
  backface-visibility: hidden;
  transform-origin: center;
}
</style>
