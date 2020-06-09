import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import member from '../views/member'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home'),
    redirect:'/Index',
    children:[
      {
        path:'/Index',
        component: () => import('../views/index/'),
      },
      // {
      //   path:'/member',
      //   component: () => import('../views/member/'),
      // },
      // {
      //   path:'/supplier',
      //   component: () => import('../views/supplier/'),
      // },
      // {
      //   path:'/goods',
      //   component: () => import('../views/goods/'),
      // },
      // {
      //   path:'/staff',
      //   component: () => import('../views/staff/'),
      // },
    ]
  },
  {
    path : "/member",
    component : () => import('../views/Home'),
    children : [
      {
        path : "/",
        component :member,
        meta : {
          title : "会员管理"
        }
      }
    ]
  },
  {
    path : "/supplier",
    component : () => import('../views/Home'),
    children : [
      {
        path : "/",
        component : () => import('../views/supplier'),
        meta : {
          title : "供应商管理"
        }
      }
    ]
  },
  {
    path : "/goods",
    component : () => import('../views/Home'),
    children : [
      {
        path : "/",
        component : () => import('../views/goods'),
        meta : {
          title : "商品管理"
        }
      }
    ]
  },
  {
    path : "/staff",
    component : () => import('../views/Home'),
    children : [
      {
        path : "/",
        component : () => import('../views/staff'),
        meta : {
          title : "员工管理"
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router