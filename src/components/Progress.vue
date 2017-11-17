<template>
    <div class="progress-line" @touchstart.prevent.stop="touchStart"  @touchmove.prevent.stop="touchMove"  @touchend.prevent.stop="touchEnd">
        <div class="progress-line-base" ref="baseLine"></div>
        <div class="progress-line-active" :style="acitveStyle">
            <div class="progress-handler" ref="handler" ></div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: 0,
      width: 0,
      startV: 0,
      startX: 0,
      val: 10
    };
  },
  props: {
    max: {
      type: Number,
      default: 1000
    },
    min: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },

  mounted() {
    this.val = this.value;
    this.width = parseInt(window.getComputedStyle(this.$refs.baseLine).width);
    // this.$refs.handler.addEventListener("touchstart", this.touchStart);
    // this.$refs.handler.addEventListener("touchmove", this.touchMove);
    // this.$refs.handler.addEventListener("touchend", this.touchEnd);
  },
  beforeDestroy() {
    this.$refs.handler.removeEventListener("touchstart", this.touchStart);
    this.$refs.handler.removeEventListener("touchmove", this.touchMove);
    this.$refs.handler.removeEventListener("touchend", this.touchEnd);
  },
  computed: {
    acitveStyle() {
      let percentage = (this.val - this.min) / (this.max - this.min) * 100;
      return {
        width: `${percentage}%`
      };
    }
  },
  methods: {
    touchStart(event) {
        console.log('touchstart');
      let touch = event.touches[0];
      this.startV = this.val;
      this.startTime = event.timeStamp;
      this.startX = touch.pageX;
    },
    touchMove(event) {

      let curTime, touch, perVal, moveX;
      curTime = event.timeStamp;
      perVal = (this.max - this.min) / this.width;
      touch = event.touches[0];
      moveX = touch.pageX - this.startX;
      this.val = Math.min(
        this.max,
        Math.max(this.min, this.startV + moveX * perVal)
      );
      this.$emit("update:value", this.val);
    },
    touchEnd() {}
  }
};
</script>

<style scoped>
.progress-line {
  position: relative;
  width: calc(100vw - 20px);
  margin-left: 10px;
  height: 2px;
}
.progress-line-base,
.progress-line-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-radius: 1px;
  height: 100%;
}

.progress-line-base {
  z-index: -1;
  background: #c1c1c1;
}
.progress-line-active {
  width: 100px;
  background: red;
}
.progress-handler {
  cursor: pointer;
  z-index: 10;
  position: absolute;
  right: -4px;
  top: -4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f5f5f5;
  box-shadow: 0px 0px 10px #000;
}
</style>
