<template>
  <div class="load">
       <div class="load-cover left">
        <div class="load-circle"></div>
      </div>
      <div class="load-cover right">
        <div class="load-circle"></div>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.load {
  position: relative;
  width: 100px;
  height: 100px;
  animation: loadMove 2000ms linear infinite;
  &-circle {
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 100%;
    border: 3px solid   red;
    border-radius: 50%;
  }

  &-basic {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .load-circle {
      width: 100%;
      border-color: red;
      border-width: 4px;
    }
  }

  &-cover {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;

    &.right {
      right: 0;
      transform-origin: left center;
      .load-circle {
        left: -100%;
        border-left-color: transparent;
        border-bottom-color: transparent;
        transform: rotateZ(-135deg);
        animation: rightMove 1500ms linear  infinite;
      }
    }
    &.left {
      left: 0;
      transform-origin: right center;
      .load-circle {
        border-right-color: transparent; border-bottom-color: transparent;
        transform: rotateZ(135deg);
        animation: leftMove 1500ms linear infinite;
      }
    }
  }
}

@keyframes loadMove {
  from{
    transform: rotateZ(0deg);
  }
  to{
    transform: rotateZ(360deg);
  }
}
@keyframes leftMove {
  0%,25%{
    transform: rotateZ(135deg);
  }
  75%,100%{
    transform: rotateZ(495deg);
  }
}

@keyframes rightMove {
  0% {
    transform: rotateZ(-135deg);
  }
  25%,37.5%{
    transform: rotateZ(45deg);
  }

  50%,100%{
    transform: rotateZ(225deg);
  }
}
</style>
