<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import axios from "axios";
import { ref } from "vue";

const form = ref({
  nombre: "",
  apellidos: "",
  dni: "",
  telefono: "",
  fecha_nacimiento: "",
  edad: "",
  sexo: "",
  ciudade_id: "",
  departamento_id: "",
  direccion: "",
  email: "",
  role_id: "",
  password: "",
});

const message = ref("");

const createUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/users/create",
      form.value
    );

    message.value = response.data.message;

    /*  cleanForm(); */
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    message.value = error.response.data.message || "Error al crear el usuario";
  }
};
</script>
<template>
  <AppLayout :title="`Crear Usuarios`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5">
        <!-- form -->
        <div class="w-full rounded-lg bg-white shadow-md p-4 mt-4">
          <form @submit.prevent="createUser" class="flex flex-col gap-4">
            <div
              class="flex flex-col gap-4 w-full items-center md:flex-row md:flex-wrap">
              <div class="flex flex-col gap-1">
                <label
                  for="nombre"
                  class="text-gray-500 text-xs md:text-sm font-bold">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="nombre"
                  v-model="form.nombre"
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
                  v-model="form.apellidos"
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
                  v-model="form.dni"
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
                  v-model="form.telefono"
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
                  v-model="form.fecha_nacimiento"
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
                  v-model="form.edad"
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
                  v-model="form.sexo"
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
                  v-model="form.departamento_id">
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
                  v-model="form.ciudade_id">
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
                  v-model="form.direccion"
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
                  v-model="form.email"
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
                  v-model="form.password"
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
                  v-model="form.role_id">
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
              Agregar
            </button>
          </form>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
