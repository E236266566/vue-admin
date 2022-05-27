import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission'

// 引入商品接口
import API from '@/api/index'

Vue.prototype.$API = API

//  设置ElementUI为英文版
// Vue.use(ElementUI, { locale })

//  设置ElementUI为中文版
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})