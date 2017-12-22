<template>
<div class="load">
    <div class="load-wrap">
      <div class="load-circlr-wrap left">
        <div class="load-circle"></div>
      </div>
      <div class="load-circlr-wrap right">
        <div class="load-circle"></div>
      </div>
      <!-- <div class="load-center">

      </div> -->
    </div>
</div>
</template>

<script>
export default {};
</script>

<style scoped>
.load {
  animation: loadMove 1000ms linear infinite;
  width: 80px;
  height: 80px;
}
.load-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  animation: wrapMove 5332ms linear infinite;
  /* animation: wrapMove 2000ms  cubic-bezier(.4,0,.2,1) infinite; */
}

.load-circlr-wrap {
  position: absolute;
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.load-circlr-wrap.left {
  left: 0;
  top: 0;
}
.load-center{
  position: absolute;
  left:50%;
  top: 0;
  margin-left:-5px;
  width: 10px;
  height: 100%;
  background-color: green;
}

.load-circlr-wrap.left .load-circle {
  transform: rotateZ(39deg);
  animation: leftMove 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.load-circlr-wrap.right {
  right: 0;
  top: 0;
  transform-origin: left center;
}
.load-circlr-wrap.right .load-circle {
  left: -100%;
  transform: rotateZ(-129deg);

  animation: rightMove 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.load-circle {
  position: absolute;
  width: 200%;
  height: 100%;
  border: 3px solid red;
  border-radius: 50%;
  border-bottom-color: transparent;
  border-left-color: transparent;
}

@keyframes rightMove {
  0% {
    transform: rotateZ(-129deg);
    opacity: 1;
  }
  50% {
    transform: rotateZ(0deg);
    opacity: 1;
  }
  100% {
    transform: rotateZ(-129deg);
    opacity: 0;
  }
}

@keyframes leftMove {
  0% {
    transform: rotateZ(39deg);
  }
  50% {
    transform: rotateZ(-90deg);
  }
  100% {
    transform: rotateZ(39deg);
  }
}

@keyframes wrapMove {
  0% {
    transform: rotateZ(9deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}
@keyframes loadMove {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
