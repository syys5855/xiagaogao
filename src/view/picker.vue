<template>
    <div>
        <picker :items="getItems"></picker>
    </div>
</template>

<script>
import Picker from "@/components/Picker";
export default {
  components: { Picker },
  computed: {
    getItems() {
      return Array.from({ length: 60 }, (val, index) => `item ${index++}`);
    }
  }
};
</script>

<style>

</style>
