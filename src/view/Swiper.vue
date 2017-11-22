<template>
    <div class="swiper-wrap">
        <!-- <swiper :items="items">
            <swiper-item v-for="(item,index) in items" :key="index" :swiper-item-index="index">
                {{item}}
            </swiper-item>
        </swiper> -->
        <swiper :items="items"></swiper>
    </div>
</template>

<script>
import Swiper from "@/components/Swiper";
import SwiperItem from "@/components/SwiperItem";
export default {
  data() {
    return {
      items: ["item1", "item2", "item3", "item4", "item5"]
    };
  },
  components: { Swiper, SwiperItem }
};
</script>

<style scoped>
.swiper-wrap {
  width: 100%;
  height: 200px;
  border: 1px solid red;
}
</style>
