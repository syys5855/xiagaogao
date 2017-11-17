<template>
    <div class="play">
        <div class="play-bg" :style="{'background-image':`url\(${bgSrc}\)`}"></div>
        <div class="play-content">
            <div class="play-cover-wrap">
                <div class="play-cover" :style="{'background-image':`url\(${bgSrc}\)`}">
                </div>
            </div>
            <div class="play-controll-wrap">
                <div class="play-controll">
                    <div style="margin-top:10px;">
                        <sy-progress :value="this.progress" :max="100" :min="0"  @update:value="val=>this.progress=val"></sy-progress>
                    </div>
                    <div>anniu </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import SyProgress from "@/components/Progress";
export default {
  components: { SyProgress },
  data() {
    return {
      bgSrc: "/src/assets/cover.jpg",
      progress: 50
    };
  }
};
</script>

<style scoped>
.play {
  width: 100vw;
  height: 100vh;
}
.play-bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(40px);
}

.play-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.play-cover-wrap {
  display: flex;
  flex: 10;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #cccccc;
}
.play-cover {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-size: 100%;
  background-repeat: no-repeat;
  transform-origin: center;
  animation: coverRotate 10s linear infinite;
}
.play-controll-wrap {
  flex: 2;
  border: 1px solid #ccc;
}
@keyframes coverRotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
