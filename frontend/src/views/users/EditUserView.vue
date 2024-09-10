<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";

const route = useRoute();
const user = ref({});
const message = ref("");

onMounted(async () => {
  const { id } = route.params;
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${id}`);
    user.value = response.data;
    message.value = response.data.message;
  } catch (error) {
    console.error("Error al cargar el usuario:", error);
    message.value = error.response.data.message || "Error al crear el usuario";
  }
});

const updateUser = async () => {
  try {
    const { id } = route.params;
    await axios.put(`http://localhost:3000/api/users/${id}`, user.value);
    message.value = "Usuario Actualizado Correctamente"
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
};
</script>
<template>
  <AppLayout :title="`Editar Usuario`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5">
        <!-- form -->
        <div class="w-full rounded-lg bg-white shadow-md p-4 mt-4">
          <form @submit.prevent="updateUser" class="flex flex-col gap-4">
            <div
              class="flex flex-col gap-4 w-full items-center md:flex-row md:flex-wrap"
            >
              <div class="flex flex-col gap-1">
                <label
                  for="nombre"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="nombre"
                  v-model="user.nombre"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="apellido"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Apellido:
                </label>
                <input
                  type="text"
                  name="apellido"
                  v-model="user.apellidos"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="dni"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  DNI:
                </label>
                <input
                  type="text"
                  name="dni"
                  v-model="user.dni"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="telefono"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Teléfono:
                </label>
                <input
                  type="text"
                  name="telefono"
                  v-model="user.telefono"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="fecha_nacimiento"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  v-model="user.fecha_nacimiento"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="edad"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Edad:
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  name="edad"
                  v-model="user.edad"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="sexo"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Sexo:
                </label>
                <input
                  type="text"
                  name="sexo"
                  v-model="user.sexo"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="departamento"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Departamento:
                </label>
                <select
                  id="departamento"
                  name="departamento"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                  v-model="user.departamento_id">
                  <option :value="null"></option>
                  <option value="1" class="cursor-pointer">Guaira</option>
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="ciudad"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Ciudad:
                </label>
                <select
                  id="ciudad"
                  name="ciudad"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                  v-model="user.ciudade_id">
                  <option :value="null"></option>
                  <option value="1" class="cursor-pointer">Troche</option>
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="direccion"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Dirección:
                </label>
                <input
                  type="text"
                  name="direccion"
                  v-model="user.direccion"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="correo"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Correo:
                </label>
                <input
                  type="email"
                  name="correo"
                  v-model="user.email"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="password"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Contraseña:
                </label>
                <input
                  type="password"
                  name="password"
                  v-model="user.password"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="rol"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  rol:
                </label>
                <select
                  id="rol"
                  name="rol"
                  class="h-10 w-72 px-2 bg-primary-light shadow rounded-lg text-sm text-primary"
                  v-model="user.role_id">
                  <option :value="null"></option>
                  <option value="1" class="cursor-pointer">
                    Administrador
                  </option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              class="h-10 w-72 bg-primary text-white shadow font-bold rounded-lg text-sm md:mx-auto hover:bg-primary-light hover:text-primary">
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
