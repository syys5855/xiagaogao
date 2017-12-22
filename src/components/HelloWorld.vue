<template>
  <div class="hello">
    <ul>
      <li>
        <router-link to="/scroll">scroll</router-link>
      </li>
      <li>
        <router-link to="/picker">picker</router-link>
      </li>
      <li>
        <router-link to="/swiper">swiper</router-link>
      </li>
      <li>
        <router-link to="/swiper2">my-swiper</router-link>
      </li>
      <li>
        <router-link to="/loading">loading</router-link>
      </li>
      <li>
      <router-link to="/decorator" tag="a">decorator</router-link>
      </li>
      <li>
        <router-link to="/diff">diff</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
