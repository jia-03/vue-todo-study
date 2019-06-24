import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import VueRouter from 'vue-router'
import createRouter from './config/router'
import createStore from './store/store'
import './assets/styles/global.styl'
const root = document.createElement('div')
document.body.appendChild(root)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter() //暴露出为方法
const store = createStore() //暴露出为方法

router.beforeEach((to,from,next)=>{
  console.log('beforeEach')
  next()
})
router.beforeResolve((to,from,next)=>{
  console.log('beforeResolve')
  next()
})
router.afterEach((to,from)=>{
  console.log('afterEach')
})


new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount(root)
