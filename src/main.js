// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'assets/font-awesome-4.7.0/css/font-awesome.css'
import Vue from 'vue'
import App from './App'
import store from './vuex/store'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    store
})