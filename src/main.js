import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueParticles from 'vue-particles'
import axios from 'axios'
import '@/directives'

Vue.use(ViewUI)
Vue.use(VueParticles)

axios.defaults.baseURL = 'http://test1.qijan.cn/'
axios.defaults.withCredentials = true
axios.interceptors.response.use(data => {
  if (data.data.status === 4) {
    router.push('/login')
  }
  return data
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : 'smoke'
  next()
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getMinutes() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.prototype.$dateFormat = function dateFormat (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getMinutes() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
