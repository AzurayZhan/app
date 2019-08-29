import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/pages/login.vue'
import register from '../components/pages/register.vue'
import index from '../components/pages/index.vue'
import findTeacher from '../components/pages/findTeacher.vue'
import water from '../components/pages/water.vue'
import waterDetail from '../components/pages/waterDetail.vue'
import waterComment from '../components/pages/waterComment.vue'
import repair from '../components/pages/repair.vue'
import repairDetail from '../components/pages/repairDetail.vue'
import repairComment from '../components/pages/repairComment.vue'
import homemaking from '../components/pages/homemaking.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
      {
        path:"/login",
        component:login
      },  
      {
        path:"/register",
        component:register
      },  
      {
        path:"/index",
        component:index
      },  
      {
        path:"/teacher",
        component:findTeacher
      },  
      {
        path:"/water",
        component:water
      },  
      {
        path:"/waterDetail",
        component:waterDetail
      },  
      {
        path:"/waterComment",
        component:waterComment
      },  
      {
        path:"/repair",
        component:repair
      },  
      {
        path:"/repairDetail",
        component:repairDetail
      },  
      {
        path:"/repairComment",
        component:repairComment
      },  
      {
        path:"/homemaking",
        component:homemaking
      },  
      {
        path:"*",
        redirect:"/index"
      }
  ]
})
