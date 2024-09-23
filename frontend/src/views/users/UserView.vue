<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const errorMessage = ref("");

const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/users");
    users.value = response.data;
  } catch (error) {
    errorMessage.value = "Error al obtener los datos de los usuarios.";
    console.error(error);
  }
};

const deleteUser = async (userId) => {
  try {
    await axios.delete(`http://localhost:3000/api/users/delete/${userId}`);
    // Filtra el usuario eliminado de la lista de usuarios
    users.value = users.value.filter((user) => user.id !== userId);
    
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
<template>
  <AppLayout :title="`Lista de Usuarios`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5">
        <!-- header -->
        <div class="w-full flex justify-end items-center mt-4">
          <router-link
            to="/users/create"
            class="w-28 h-8 text-white font-bold bg-primary flex items-center justify-center rounded-md shadow-lg hover:bg-primary-light hover:text-primary hover:border">
            Crear
          </router-link>
        </div>
        <!-- table -->
        <div class="w-full overflow-x-auto rounded-lg bg-white shadow-md">
          <!-- table -->
          <table class="w-full text-sm whitespace-nowrap overflow-hidden">
            <thead>
              <tr class="h-12 shadow text-sm border-b-2">
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  N°
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Nombre
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Apellido
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  CI
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Correo
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Rol
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="h-14 text-center shadow group border-b-2"
                v-for="(user, index) in users">
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ index + 1 }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.nombre }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.apellidos }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.dni }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.email }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.rol }}
                </td>
                <td
                  class="py-1 px-1 text-sm md:text-xs bg-white group-hover:bg-gray-100">
                  <div
                    class="w-full h-full flex items-center justify-center gap-2">
                    <router-link
                      :to="`/users/edit/${user.slug}`"
                      class="inline-block border bg-primary-light px-3 py-3 rounded-full bg-light-green-two hover:shadow-md">
                      <Edit class="w-3 h-3 fill-primary" />
                    </router-link>
                    <button
                       @click="deleteUser(user.id)"
                      class="inline-block border bg-primary-light px-3 py-3 rounded-full bg-light-green-two hover:shadow-md">
                      <Delete class="w-3 h-3 fill-primary" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
