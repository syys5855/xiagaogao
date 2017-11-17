<template>
  <div>
    <h1>hello world {{value}}</h1>
    
    <div style="height:30px; width:100px;position:absolute;border:1px solid #000;top:130px;left:112px;"></div>
    <div class="select" ref="select" :style="selectStyle">
      <div class="select-item" :class="{hidden:setHidden(item.index)}"  v-for="(item,index) in renderData"  :key="index" :style="setItemDeg(item.index)">{{item.value}}</div>
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
      startTime: "",
      curDeg: 0,
      moveDeg: 0,
      marginY: 0,
      maxRotateX: 0,
      minRotateX: 0,
      perDeg: 20,
      value: "",
      spin: { start: -9, end: 9, branch: 9 }
    };
  },
  props: {
    items: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: "line"
    }
  },
  computed: {
    renderData() {
      let temp = [];
      for (let k = this.spin.start; k <= this.spin.end; k++) {
        let data = {
          value: this.getSpinData(k),
          index: k
        };
        temp.push(data);
      }
      return temp;
    }
  },
  mounted() {
    this.maxRotateX = (1 - this.items.length) * this.perDeg;
    this.$el.addEventListener("touchstart", this.touchStart, false);
    this.$el.addEventListener("touchend", this.touchEnd, false);
    this.$el.addEventListener("touchmove", this.touchMove, false);
  },
  beforeDestroy() {
    this.$el.removeEventListener("touchstart", this.touchStart);
    this.$el.removeEventListener("touchend", this.touchEnd);
    this.$el.removeEventListener("touchmove", this.touchMove);
  },
  methods: {
    touchStart(event) {
      let touch = event.touches[0];
      this.startX = touch.pageX;
      this.startY = touch.pageY;
      this.startTime = event.timeStamp;
    },
    touchMove(event) {
      event.preventDefault();
      event.stopPropagation();

      let touch = event.touches[0],
        pageX = touch.pageX,
        pageY = touch.pageY,
        marginY = pageY - this.startY;
      this.marginY = marginY;
      this.setStyle("move", marginY);
    },
    touchEnd(event) {
      let touch = event.changedTouches[0],
        endTime = event.timeStamp,
        speedTime = endTime - this.startTime,
        speed = this.marginY / speedTime;
      if (speedTime <= 300) {
        let a = 1.8;
        let move = speed * a * speedTime;
        this.setStyle("end", move);
      } else {
        this.setStyle("end", this.marginY);
      }
    },
    setItemDeg(index) {
      return {
        transform: `rotate3d(1, 0, 0, ${(-index * 20) %
          360}deg) translate3d(0px, 0px, 100px)`
      };
    },
    setStyle(type, move, time = 1000) {
      const deg = 20,
        perHeight = 34,
        move2Deg = deg / perHeight; //记录对应的角度转化
      if (type === "move") {
        let updatDeg = move2Deg * move + this.curDeg;
        updatDeg = Math.min(
          this.minRotateX,
          Math.max(updatDeg, this.maxRotateX)
        );
        this.selectStyle = {
          transition: "",
          transform: `rotateX(${-1 * updatDeg}deg)`
        };

        // select deg
        let endDeg = Math.round(updatDeg / deg);
        this.updateSpin(Math.abs(endDeg));
      } else if (type === "end") {
        let endDeg = Math.round(move2Deg * move / deg) * deg + this.curDeg;
        endDeg = Math.min(this.minRotateX, Math.max(endDeg, this.maxRotateX));
        this.selectStyle = {
          transform: `rotateX(${-1 * endDeg}deg)`,
          transition: `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
        };
        this.curDeg = endDeg;
        this.value = this.items[Math.abs(endDeg) / this.perDeg];
      }
    },
    setHidden(index) {
      return index < 0 || index > this.items.length - 1;
    },
    getSpinData(index) {
      let items = this.items;
      index = index % items.length;
      return items[index >= 0 ? index : index + items.length];
    },
    updateSpin(selIndex) {
      // 计算开始与结尾,会触发计算属性 renderData
      this.spin.start = selIndex - this.spin.branch;
      this.spin.end = this.spin.start + 2 * this.spin.branch;
    }
  }
};
</script>

<style scoped>
.select {
  width: 100px;
  height: 34px;
  /* border: 1px solid #ccc; */
  margin: 100px auto;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center;
}
.hidden {
  display: none;
}
.select-item {
  position: absolute;
  height: 34px;
  left: 0;
  top: 0;
  backface-visibility: hidden;
  transform-origin: center;
}
</style>
