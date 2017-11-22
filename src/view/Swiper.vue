<template>
    <div class="swiper-wrap">
        <swiper :items="items">""</swiper>
    </div>
</template>

<script>
import Swiper from "@/components/Swiper";
export default {
  data() {
    return {
      items: [1, 2, 3, 4]
    };
  },
  components: { Swiper }
};
</script>

<style scoped>
.swiper-wrap {
  width: 100%;
  height: 200px;
  border: 1px solid red;
}
</style>
