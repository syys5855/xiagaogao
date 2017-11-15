import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Scroll from '@/components/Scroll'
import Picker from '@/view/Picker';
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        }, {
            path: '/scroll',
            name: 'Scroll',
            component: Scroll
        },
        {
            path: '/picker',
            component: Picker
        }
    ]
})