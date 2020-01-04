import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SlideVerify from 'vue-monoplasty-slide-verify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Videojs from 'video.js';
import 'video.js/dist/video-js.css';
import  Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(SlideVerify)
Vue.prototype.WebSiteUrl="http://www.wdehbcj.top:8888"

Vue.prototype.$video=Videojs

Vue.use(VueAxios,axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
