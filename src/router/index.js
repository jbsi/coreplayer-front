import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/pc/MyLogin'
import Register from "@/views/pc/Register";
import Index from "@/views/pc/Index";
import VideoPlayer from "@/views/pc/VideoPlayer";
import GeneralPage from "@/views/pc/GeneralPage";
import UserMessage from "@/views/pc/UserMessage";
import MIndex from "@/views/mobile/MIndex";
import MVideoPlayer from "@/views/mobile/MVideoPlayer";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path:'/usermessage',
    name:'usermessage',
    component:UserMessage
  },
  {
    path:'/generalpage',
    name:'generalpage',
    component:GeneralPage
  },

  {
    path:'/video',
    name:'videoplayer',
    component:VideoPlayer
  },

  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path:'/register',
    name:'register',
    component: Register
  },
  {
    path:'/mindex',
    name:'mindex',
    component:MIndex
  },
  {
    path:'/mvideoplayer',
    name:'mvideoplayer',
    component:MVideoPlayer
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
