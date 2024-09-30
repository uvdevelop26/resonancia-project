<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import TextInput from "@/components/TextInput.vue";
import SelectInput from "@/components/SelectInput.vue";
import FlashMessage from "@/components/FlashMessage.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

/* create form */
const form = ref({
  nombre: "",
  apellidos: "",
  slug: "",
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

const errors = ref({});

/* functios */
const cleanForm = () => {
  for (let clave in form.value) {
    form.value[clave] = "";
  }
};

const slugify = () => {
  const fullName = `${form.value.nombre} ${form.value.apellidos}`;
  const slug = fullName
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

  form.value.slug = slug;
};

const close = ()=>{
  message.value = ""
}

/* to show in the select input */
const departamentos = ref(null);
const ciudades = ref(null);
const roles = ref(null);

const message = ref("");

/* create new user */
const createUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/users/store",
      form.value
    );

    message.value = response.data.msg;

    errors.value = {}
    cleanForm();

  } catch (error) {
    if (error.response) {
      const errorObject = error.response.data.errors || [];

      const newObjectError = {};

      errorObject.forEach((err) => {
        const path = err.path;

        if (!newObjectError[path]) {
          newObjectError[path] = [];
        }

        newObjectError[path].push(err);
      });

      errors.value = newObjectError;
    }
  }
};

/* Resquest data from the server */
const fechData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/users/create");

    departamentos.value = response.data.departamentos;
    ciudades.value = response.data.ciudades;
    roles.value = response.data.roles;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fechData);
</script>
<template>
  <AppLayout :title="`Crear Usuarios`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5 relative">
        <!-- flash message -->
        <FlashMessage v-if="message" type="success" :message="message" @close="close" />
        <!-- form -->
        <div class="w-full rounded-lg bg-white shadow-md p-4 lg:p-6 mt-4">
          <form @submit.prevent="createUser" class="flex flex-col gap-4">
            <div
              class="flex flex-col gap-4 w-full items-center md:flex-row md:flex-wrap">
              <TextInput
                label="Nombre"
                type="text"
                id="nombre"
                :error="errors.nombre"
                v-model="form.nombre"
                @input="slugify()"
              />
              <TextInput
                label="Apellidos"
                type="text"
                id="apellidos"
                :error="errors.apellidos"
                v-model="form.apellidos"
                @input="slugify()"
              />
              <TextInput
                label="Slug"
                type="text"
                id="slug"
                :error="errors.slug"
                v-model="form.slug"
                disabled="true"
              />
              <TextInput
                label="DNI"
                type="text"
                id="dni"
                :error="errors.dni"
                v-model="form.dni"
              />
              <TextInput
                label="Teléfono"
                type="text"
                id="telefono"
                :error="errors.telefono"
                v-model="form.telefono"
              />
              <TextInput
                label="Fecha de Nacimiento"
                type="date"
                id="fecha_nacimiento"
                :error="errors.fecha_nacimiento"
                v-model="form.fecha_nacimiento"
              />
              <TextInput
                label="Edad"
                type="number"
                id="edad"
                min="1"
                max="100"
                :error="errors.edad"
                v-model="form.edad"
              />
              <SelectInput
                label="Sexo"
                id="sexo"
                :error="errors.sexo"
                v-model="form.sexo">
                <template #options>
                  <option :value="null"></option>
                  <option value="femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                </template>
              </SelectInput>
              <SelectInput
                label="Departamento"
                id="departamento_id"
                v-model="form.departamento_id">
                <template #options>
                  <option :value="null"></option>
                  <option
                    v-for="departamento in departamentos"
                    :key="departamento.id"
                    :value="departamento.id"
                  >
                    {{ departamento.nombre }}
                  </option>
                </template>
              </SelectInput>
              <SelectInput
                label="Ciudad"
                id="ciudade_id"
                :error="errors.ciudade_id"
                v-model="form.ciudade_id"
              >
                <template #options>
                  <option :value="null"></option>
                  <option
                    v-for="ciudade in ciudades"
                    :key="ciudade.id"
                    :value="ciudade.id"
                  >
                    {{ ciudade.nombre }}
                  </option>
                </template>
              </SelectInput>
              <TextInput
                label="Dirección"
                type="text"
                id="direccion"
                :error="errors.direccion"
                v-model="form.direccion"
              />
              <TextInput
                label="Correo"
                type="email"
                id="email"
                :error="errors.email"
                v-model="form.email"
              />
              <TextInput
                label="Contraseña"
                type="password"
                id="password"
                :error="errors.password"
                v-model="form.password"
              />
              <SelectInput
                label="Rol"
                id="role_id"
                :error="errors.role_id"
                v-model="form.role_id"
              >
                <template #options>
                  <option :value="null"></option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.nombre }}
                  </option>
                </template>
              </SelectInput>
              <button
                type="submit"
                class="h-10 w-72 bg-primary text-white shadow font-bold rounded-lg text-sm hover:bg-primary-light hover:text-primary md:mt-8"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
