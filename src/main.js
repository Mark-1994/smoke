import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueParticles from 'vue-particles'
import axios from 'axios'

Vue.use(ViewUI)
Vue.use(VueParticles)

axios.defaults.baseURL = 'http://api.npm.link/'
axios.defaults.withCredentials = true
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
