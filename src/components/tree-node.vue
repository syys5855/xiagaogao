<template>
    <li class="mnode">
        <div @click="toggleOrClick">{{node.text}}</div>
        <ul v-show="isOpen">
            <li v-for="child in node.children" :key="child.id">
                <div v-if="child.children.length===0" @click="clickChild(child)">{{child.text}}</div>
                <tnode v-else :node="child"></tnode>
            </li>
        </ul>
    </li>
</template>

<script>

// 嵌套组件使用 name
export default {
  name: "tnode",
  props: ["node"],
  data() {
    return {
      isOpen: true
    };
  },
  computed: {
    isFloder() {
      return this.node.children.length > 0;
    }
  },
  methods: {
    toggleOrClick() {
      if (this.isFloder) {
        console.log("node is floder", this.node);
        this.isOpen = !this.isOpen;
      } else {
        console.log("node is text", this.node);
      }
    },
    clickChild(child) {
      console.log(child.text);
    }
  }
};
</script>

<style scoped>
ul {
  margin-left: 1em;
}
</style>
