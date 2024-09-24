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

    /* camara */
    {
      path: '/analisis',
      name: 'analisis',
      component: Camara,
      meta: { requiresAuth: true },
    },
    

    /* users */

    /* */

    /*    
      
       */

    /* roles */
    /* {
      path: '/roles',
      name: 'roles',
      component: roleIndex,
      meta: { requiresAuth: true },
    },
    {
      path: '/roles/create',
      name: 'createRole',
      component: CreateRole,
      meta: { requiresAuth: true },
    },
    {
      path: '/roles/edit/:id',
      name: 'editRole',
      component: EditRole,
      meta: { requiresAuth: true },
    }, */

    /* fincas */
    /* {
      path: '/fincas',
      name: 'fincas',
      component: fincaIndex,
      meta: { requiresAuth: true },
    },
    {
      path: '/fincas/create',
      name: 'createFinca',
      component: CreateFinca,
      meta: { requiresAuth: true },
    },
    {
      path: '/fincas/edit/:id',
      name: 'editFinca',
      component: EditFinca,
      meta: { requiresAuth: true },
    }, */


    /* cultivos */
    /* {
      path: '/cultivos',
      name: 'cultivos',
      component: cultivoIndex,
      meta: { requiresAuth: true },
    },
    {
      path: '/cultivos/create',
      name: 'CreateCultivo',
      component: CreateCultivo,
      meta: { requiresAuth: true },
    },
    {
      path: '/capturar',
      name: 'capturar',
      component: Capturar
    },
    {
      path: '/cultivos/edit/:id',
      name: 'editCultivo',
      component: EditCultivo,
      meta: { requiresAuth: true },
    }, */
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
