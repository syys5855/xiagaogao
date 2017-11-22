<template>
  <div>
      <h1>scroll</h1>
      <div class="wrapper" ref="wrapper" >
        <ul class="content">
            <div style="height:50px;line-height:50px;">
                <span class="pullDownIcon"></span><span class="pullDownLabel">Pull down to refresh...</span>
            </div>
            <li v-for="(item,index) in scrollItems" :key="index">{{item}}</li>
        </ul>
</div>
  </div>
</template>

<script>
import BScrll from "better-scroll";
export default {
  data() {
    return {
      items: [
        "scroll item 0",
        "scroll item 1",
        "scroll item 2",
        "scroll item 3",
        "scroll item 4",
        "scroll item 5",
        "scroll item 6",
        "scroll item 7",
        "scroll item 8",
        "scroll item 9",
        "scroll item 10",
        "scroll item 11",
        "scroll item 12",
        "scroll item 13",
        "scroll item 14",
        "scroll item 15",
        "scroll item 16",
        "scroll item 17",
        "scroll item 18",
        "scroll item 19",
        "scroll item 20",
        "scroll item 21",
        "scroll item 22",
        "scroll item 23",
        "scroll item 24",
        "scroll item 25",
        "scroll item 26",
        "scroll item 27",
        "scroll item 28",
        "scroll item 29",
        "scroll item 30",
        "scroll item 31",
        "scroll item 32",
        "scroll item 33",
        "scroll item 34",
        "scroll item 35",
        "scroll item 36",
        "scroll item 37",
        "scroll item 38",
        "scroll item 39",
        "scroll item 40",
        "scroll item 41",
        "scroll item 42",
        "scroll item 43",
        "scroll item 44",
        "scroll item 45",
        "scroll item 46",
        "scroll item 47",
        "scroll item 48",
        "scroll item 49"
      ],
      contentStyle: ""
    };
  },
  computed: {
    scrollItems() {
      return this.items;
    }
  },
  created() {
    this.$nextTick(() => {
      let el = this.$refs.wrapper;
      this.scroller = new BScrll(el, {
        probeType: 1,
        pullDownRefresh: true,
        threshold: 100,
        stop: 50
      });
    });
  }
};
</script>

<style>
.wrapper {
  height: 300px;
  width: 100%;
  background-color: #ccc;
  overflow: hidden;
}
.wrapper li {
  height: 50px;
  line-height: 50px;
}
</style>
