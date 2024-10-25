<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import AdminUser from "@/components/icons/AdminUser.vue";
import PacienteUser from "@/components/icons/PacienteUser.vue";
</script>
<template>
  <AppLayout :title="`Selecciona Usuario`">
    <template #content>
      <div class="h-full w-full pt-8 flex flex-col items-center gap-4 md:flex-row md:items-start">
        <router-link
          class="bg-primary-light w-full h-20 border-2 border-primary p-4 rounded-lg flex items-center gap-3 shadow-md group hover:bg-primary hover:border-primary-light max-w-84"
          to="/users/administradores">
          <span
            class="text-lg text-primary font-bold group-hover:text-primary-light">Administrador</span>
          <AdminUser
            class="w-7 h-7 fill-primary group-hover:fill-primary-light"
          />
        </router-link>
        <router-link
          class="bg-primary-light w-full h-20 border-2 border-primary p-4 rounded-lg flex items-center gap-3 shadow-md group hover:bg-primary hover:border-primary-light max-w-84"
          to="/users/pacientes">
          <span
            class="text-lg text-primary font-bold group-hover:text-primary-light">Paciente</span>
          <PacienteUser
            class="w-7 h-7 fill-primary group-hover:fill-primary-light"
          />
        </router-link>
      </div>
    </template>
  </AppLayout>
</template>
