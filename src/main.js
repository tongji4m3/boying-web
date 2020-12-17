import Vue from 'vue'
import App from './Index.vue'
import router from './router'
import store from './store'


// md5加密
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// ElementUI https://element.eleme.cn/2.0/#/zh-CN/component/installation
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//全局api
import api from './assets/config/api.js'
Vue.prototype.$api = api


//全局axios配置
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.headers['Content-Type'] = 'application/json';

//设置axios请求头加入token
axios.interceptors.request.use(config => {
  console.log("token token")
  if (config.push === '/') {
  } else {
      if (window.sessionStorage.getItem('token')) {
          console.log("token here")
          config.headers.Authorization = `Bearer ${window.sessionStorage.getItem('token')}`;
      }
  }
  return config;
},
  error => {
      console.log("axios.interceptors.request", error)
  });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
