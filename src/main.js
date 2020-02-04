
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import VueCropper from 'vue-cropper'
Vue.use(VueCropper) // 图片裁剪

import App from './App'
import store from './store'
import router from './router'

import './assets/jquery-easyui-1.6.7/themes/black/easyui.css'
import './assets/jquery-easyui-1.6.7/themes/icon.css'
import './assets/jquery-easyui-1.6.7/jquery.easyui.min.js'
import './assets/jquery-easyui-1.6.7/windowAdapter'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import '@/components/Pagination/page.js'
import * as filters from './filters' // global filters

import * as socketApi from './api/socket'// socket
Vue.prototype.socketApi = socketApi
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 公共混入
import './utils/mixins' // mixins

Vue.config.productionTip = true
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

/*
// 函数式编程工具库
import * as _ from 'lodash'
import * as R from 'ramda'
// 获取顶层对象
import _G from '@/utils/global'*/
