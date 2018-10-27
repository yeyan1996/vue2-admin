import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/layout'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
      {
        path:'/',
        name:'index',
        redirect:'/example/index'
      },
      {
          path: '/example',
          component: layout,
          meta: {
              title: 'example',
              icon: 'chart'
          },
          children: [
              {
                  path: 'index',
                  component: () => import('@/views/example/index'),
                  name: 'example',
                  meta: { title: 'index' }
              },
          ]
      }
  ]
})


router.beforeEach(async(to, from, next) => {
    //设置标题
    document.title = to.meta.title || 'vue模版'
    next()
})

export default router