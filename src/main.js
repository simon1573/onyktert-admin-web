import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, "$hostname", {
  value: "http://10.1.1.110:1992/api/v1"
});

new Vue({
  render: h => h(App),
}).$mount('#app')
