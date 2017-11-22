// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper);
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
/* eslint-disable no-new */
Vue.use(swiper.name, swiper);
Vue.use(swiperSlide.name, swiperSlide);

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})