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
      startTime: "",
      curDeg: 0,
      moveDeg: 0,
      marginY: 0,
      maxRotateX: 0,
      minRotateX: 0,
      perDeg: 20
    };
  },
  computed: {
    getItems() {
      let per = this.perDeg,
        index = 0;
      let items = Array.from({ length: 14 }, () => `item ${index++}`);
      return items.map((item, index) => {
        return {
          text: item,
          style: {
            transform: `rotate3d(1,0,0,${-index *
              per}deg) translate3d(0,0,100px)`
          }
        };
      });
    }
  },
  mounted() {
    this.maxRotateX = (1 - this.getItems.length) * this.perDeg;
    console.log(this.maxRotateX);

    this.$el.addEventListener("touchstart", this.touchStart, false);
    this.$el.addEventListener("touchend", this.touchEnd, false);
    this.$el.addEventListener("touchmove", this.touchMove, false);
  },
  methods: {
    touchStart(event) {
      let touch = event.touches[0];
      this.startX = touch.pageX;
      this.startY = touch.pageY;
      this.startTime = event.timeStamp;
    },
    touchMove(event) {
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
        let move = speed * a * (endTime - this.startTime);
        this.setStyle("end", move);
        console.log("move add--->", this.marginY, move, 1000 + speedTime);
      } else {
        this.setStyle("end", this.marginY);
      }
    },
    setStyle(type, move, time = 1000) {
      const deg = 20,
        perHeight = 34,
        move2Deg = deg / perHeight;
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
      } else if (type === "end") {
        let endDeg = Math.round(move2Deg * move / deg) * deg + this.curDeg;
        endDeg = Math.min(this.minRotateX, Math.max(endDeg, this.maxRotateX));
        this.selectStyle = {
          transform: `rotateX(${-1 * endDeg}deg)`,
          transition: `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
        };
        this.curDeg = endDeg;
      }
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
.select-item {
  position: absolute;
  height: 34px;
  left: 0;
  top: 0;
  backface-visibility: hidden;
  transform-origin: center;
}
</style>
