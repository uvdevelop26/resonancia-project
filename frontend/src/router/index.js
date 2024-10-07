import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import DashboardView from "@/views/DashboardView.vue"
import UserView from "@/views/users/UserView.vue"
import CreateUserView from '@/views/users/CreateUserView.vue'
import EditUserView from '@/views/users/EditUserView.vue'
import Camara from '@/views/analisis/Camara.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/users',
      name: 'users',
      component: UserView,
      meta: { requiresAuth: true },
    },
    {
      path: '/users/create',
      name: 'createUser',
      component: CreateUserView,
      meta: { requiresAuth: true },
    },
    {
      path: '/users/edit/:slug',
      name: 'EditUser',
      component: EditUserView,
      meta: { requiresAuth: true },
    },
    {
      path: '/analisis',
      name: 'analisis',
      component: Camara,
      meta: { requiresAuth: true },
    },

  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
