import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueGtag from 'vue-gtag';

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://localhost:44325/'
//axios.defaults.baseURL = 'https://terapicfisichelperweb20210507135641.azurewebsites.net/'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false;

// Configuration VueAnalytics
Vue.use(VueGtag, {
  config: { id: "UA-209091372-2" }
});
