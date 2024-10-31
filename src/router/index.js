import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/exercises'
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/exercises'
      },
      {
        path: 'program',
        component: () => import('@/views/Program.vue')
      },
      {
        path: 'exercises',
        component: () => import('@/views/Exercises.vue'),
      },
      {
        path: 'rest',
        component: () => import('@/views/Rest.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
