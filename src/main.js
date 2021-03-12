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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
