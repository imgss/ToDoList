import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import todoList from '../components/todolist/index.vue'
import writeView from '../components/todolist/write.vue'

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: todoList },
        {
            path: '/write',
            component: writeView

        }
    ]
})