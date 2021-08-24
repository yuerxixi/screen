// import 'lib-flexible'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/js/rem'
import '@/assets/scss/font.scss'
import './assets/icons' // icon
import Market from 'vue-img-market'
import echarts from '@/lib/echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Market)
import '@/assets/js/uiNecessary'
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
