import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import DashboardView from "@/views/DashboardView.vue"
import UserView from "@/views/UserView.vue"
import CreateUserView from '@/views/users/CreateUserView.vue'
import EditUserView from '@/views/users/EditUserView.vue'

/* import Dashboard from '@/views/Dashboard.vue'
import Capturar from '@/views/Capturar.vue';
import userIndex from '@/views/users/userIndex.vue'
import roleIndex from '@/views/roles/roleIndex.vue';
import fincaIndex from '@/views/fincas/fincaIndex.vue'
import cultivoIndex from '@/views/cultivos/cultivoIndex.vue'
import CreateUser from "@/views/users/CreateUser.vue"
import CreateRole from '@/views/roles/CreateRole.vue'
import CreateFinca from '@/views/fincas/CreateFinca.vue'
import CreateCultivo from '@/views/cultivos/CreateCultivo.vue'
import EditUser from "@/views/users/EditUser.vue"
import EditRole from "@/views/roles/EditRole.vue"
import EditFinca from "@/views/fincas/EditFinca.vue"
import EditCultivo from "@/views/cultivos/EditCultivo.vue" */

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
      path: '/users/edit/:id',
      name: 'EditUser',
      component: EditUserView, // Carga la vista de edición de usuario
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
