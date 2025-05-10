import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import TransactionsView from '@/views/admin/TransactionsView.vue'
import TaxationView from '@/views/admin/TaxationView.vue'
import TaxSubmitted from '@/views/admin/TaxSubmitted.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView, 
    },
    {
      path: '/register',
      name: 'register',
       component: RegisterView,
    },
    {
      path: '/item',
      name: 'item',
       component: TransactionsView,
    },
    {
      path: '/tax',
      name: 'TaxationView',
       component: TaxationView,
    },
    {
      path: '/taxsub',
      name: 'TaxSubmitted',
       component: TaxSubmitted,
    },
 ],
})

export default router