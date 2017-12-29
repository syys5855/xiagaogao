<template>
    <ul>
        <tnode :node="files">
        </tnode>
    </ul>
</template>

<script>
import tnode from "@/components/tree-node.vue";
export default {
  props: ["files"],
  components: {
    tnode
  }
};
</script>

<style>

</style>
