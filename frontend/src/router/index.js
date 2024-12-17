import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import DashboardView from "@/views/DashboardView.vue"
import SelectUserView from '@/views/users/SelectUserView.vue'
import AdministradorView from '@/views/users/administrador/AdministradorView.vue'
import PacienteView from '@/views/users/paciente/PacienteView.vue'
import AdministradorCreate from '@/views/users/administrador/AdministradorCreate.vue'
import AdministradorEdit from '@/views/users/administrador/AdministradorEdit.vue'
import PacienteCreate from '@/views/users/paciente/PacienteCreate.vue'
import PacienteEdit from '@/views/users/paciente/PacienteEdit.vue'
import ExamenView from '@/views/examenes/ExamenView.vue'
import ExamenCreate from '@/views/examenes/ExamenCreate.vue'
import ExamenShow from '@/views/examenes/ExamenShow.vue'

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
    /* users */
    {
      path: '/users/select',
      name: 'selectUser',
      component: SelectUserView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/administrador',
      name: 'userAdmin',
      component: AdministradorView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/paciente',
      name: 'userPaciente',
      component: PacienteView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/administrador/create',
      name: 'createUserAdmin',
      component: AdministradorCreate,
      meta: { requiresAuth: true },
    },
    {
      path: '/users/administrador/edit/:slug',
      name: 'EditUserAdmin',
      component: AdministradorEdit,
      meta: { requiresAuth: true },
    },
    {
      path: '/users/paciente/create',
      name: 'createUserPaciente',
      component: PacienteCreate,
      meta: { requiresAuth: true },
    },
    {
      path: '/users/paciente/edit/:slug',
      name: 'EditUserPaciente',
      component: PacienteEdit,
      meta: { requiresAuth: true },
    },

    /* analisis */
    {
      path: '/examenes',
      name: 'Examen',
      component: ExamenView,
      meta: { requiresAuth: true },
    },
    {
      path: '/examenes/create',
      name: 'ExamenCreate',
      component: ExamenCreate,
      meta: { requiresAuth: true },
    },
    {
      path: '/examenes/show/:id',
      name: 'ExamenShow',
      component: ExamenShow,
      meta: { requiresAuth: true },
    }

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
