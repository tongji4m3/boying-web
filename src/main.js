import Vue from 'vue'
import App from './App.vue'
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

//拦截器 发送请求前,会发送一个token
axios.interceptors.request.use(config =>
{
  config.headers.authorization = window.sessionStorage.getItem('token');
  return config;
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
