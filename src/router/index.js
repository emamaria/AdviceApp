import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:() => import('../home/pages/HomePage.vue')
    },
    {
      path: '/entry',
      name: 'entry',
      component:() => import('../home/layout/EntryPage.vue'),
      redirect:'/entry/login',
      children: [
        
      {
      path: '/entry/login',
      name: 'login',
      component: () => import('../home/pages/LoginPage.vue')
      },
      {
      path: '/entry/register',
      name: 'register',
      
      component: () => import('../home/pages/RegisterPage.vue')
       }   
      ]

    },

    {
      path: '/users',
      name: 'users',
      redirect: `/users/advice`,
      component: () => import('../users/layout/UsersPage.vue'),
      children: [
        {
          path: `/users/advice`,
          name: 'users-advice',
          component: () => import('../users/pages/AdvicePage.vue'),
        
        },
        {
          path: `/users/advice/:id`,
          name: 'user',
          component: () => import('../users/pages/UserPage.vue') 
        }
      ]
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => ({ name: 'home', params: {}})
    }
  ]
})

export default router
