<template>
    <div class="my-loading-wrap">
        <div class="my-loading">
        </div>
        <div style="height:100%;width:50%;position:relative;overflow:hidden;">
            <div class="my-loading-left">
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.my-loading-wrap {
  position: relative;
  width: 90px;
  height: 90px;
  border-color: red;
  animation: loading 1500ms linear infinite;
}
.my-loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-color: inherit;
  border-style: solid;
  border-width: 3px;
  border-radius: 50%;
  border-bottom-color: transparent;
  border-left-color: transparent;
  animation: move1 5000ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}
.my-loading-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 100%;
  border-color: red;
  border-width: 3px;
  border-style: solid;
  border-radius: 50%;
  border-bottom-color: transparent;
  transform: rotateZ(90deg);
  animation: moveLeft 1000ms linear infinite alternate both;
}

.my-loading.reverse {
  z-index: 10;
  border-bottom-color: #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  /* animation: loadingReverse 1500ms cubic-bezier(0.075, 0.82, 0.165, 1) infinite; */
}
@keyframes move1 {
  0% {
    transform: rotateZ(0deg);
  }
  19% {
    transform: rotateZ(144deg);
  }
  20% {
    transform: rotateZ(144deg);
  }
  39% {
    transform: rotateZ(288deg);
  }
  40% {
    transform: rotateZ(288deg);
  }
  59% {
    transform: rotateZ(432deg);
  }
  60% {
    transform: rotateZ(432deg);
  }
  79% {
    transform: rotateZ(576deg);
  }
  80% {
    transform: rotateZ(576deg);
  }
  99% {
    transform: rotateZ(720deg);
  }
  100% {
    transform: rotateZ(720deg);
  }
}

@keyframes loading {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
@keyframes loadingReverse {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}

@keyframes moveLeft {
    from{
        transform: rotateZ(90deg)
    }
    to{
        transform: rotateZ(0deg)
    }
}
</style>
