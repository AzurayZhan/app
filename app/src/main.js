// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/js/jquery"

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

import "./assets/js/rem"
import "./assets/css/reset.css"
import axios from "axios"
import qs from "qs"
Vue.prototype.$http=axios
Vue.prototype.$qs=qs

import  {format} from 'timeago.js'
Vue.filter("timeChange",(val)=>{
  val = parseFloat(val)//将获取的字符串转换为数字
  let time = new Date(val); //先将接收到的json格式的日期数据转换成可用的js对象日期
    return format(time, 'zh_CN'); //转换成类似于几天前的格式
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
