<template>
  <tree :files="files"></tree>
</template>

<script>
import tree from "@/components/tree.vue";
export default {
  data() {
    return {
      files: {
        text: "parent",
        _id: 1,
        parent: null,
        children: [
          {
            text: "child1",
            _id: 2,
            parent: 1,
            children: []
          },
          {
            text: "child2",
            _id: 3,
            parent: 1,
            children: [
              {
                text: "child3",
                _id: 4,
                parent: 3,
                children: []
              },
              {
                text: "child4",
                _id: 5,
                parent: 3,
                children: [
                  {
                    text: "child5",
                    _id: 6,
                    parent: 5,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  components: {
    tree
  }
};
</script>

<style>

</style>
