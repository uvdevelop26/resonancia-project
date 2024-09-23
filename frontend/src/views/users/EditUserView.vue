<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import TextInput from "@/components/TextInput.vue";
import SelectInput from "@/components/SelectInput.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";
import moment from "moment-timezone";

const route = useRoute();

/*  data and message */
const roles = ref(null);
const ciudades = ref(null);
const departamentos = ref(null);
const message = ref("");

/* form edit */
const form = ref({
  id: "",
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

/* functions */

const getCurrentDptoId = (ciudades, ciudade_id) => {
  const ciudad = ciudades.filter((ciudade) => ciudade.id === ciudade_id);
  const departamentoId = ciudad[0].departamento_id;

  return departamentoId;
};

const getFormattedDate = (date) => {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  return formattedDate;
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



/* fetch data */

const fetchData = async () => {
  const { slug } = route.params;

  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/edit/${slug}`
    );

    /* get datas */

    ciudades.value = response.data.ciudades;
    departamentos.value = response.data.departamentos;
    roles.value = response.data.roles;

    const departamentoId = getCurrentDptoId(
      ciudades.value,
      response.data.persona.ciudade_id
    );

    const formattedDateBday = getFormattedDate(
      response.data.persona.fecha_nacimiento
    );

    /* fill form */
    form.value = {
      id: response.data.user.id,
      nombre: response.data.persona.nombre,
      apellidos: response.data.persona.apellidos,
      slug: response.data.user.slug,
      dni: response.data.persona.dni,
      telefono: response.data.persona.telefono,
      fecha_nacimiento: formattedDateBday,
      edad: response.data.persona.edad,
      sexo: response.data.persona.sexo,
      ciudade_id: response.data.persona.ciudade_id,
      departamento_id: departamentoId,
      direccion: response.data.persona.direccion,
      email: response.data.user.email,
      role_id: response.data.user.role_id,
      password: "",
    };

    message.value = response.data.message;
  } catch (error) {
    console.error("Error al cargar el usuario:", error);
    message.value = error.response.data.message || "Error al crear el usuario";
  }

};

const updateUser = async () => {
  try {
    const { slug } = route.params;
    const response = await axios.put(`http://localhost:3000/api/users/update/${slug}`, form.value);
    message.value = response.data.message;
    fetchData();
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchData);
</script>
<template>
  <AppLayout :title="`Editar Usuario`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5">
        <!-- form -->
        <div class="w-full rounded-lg bg-white shadow-md p-4 mt-4">
          <form @submit.prevent="updateUser" class="flex flex-col gap-4">
            <div
              class="flex flex-col gap-4 w-full items-center md:flex-row md:flex-wrap">
              <TextInput
                class="hidden"
                label="Nombre"
                type="text"
                id="nombre"
                v-model="form.id"
              />
              <TextInput
                label="Nombre"
                type="text"
                id="nombre"
                v-model="form.nombre"
                @input="slugify()"
              />
              <TextInput
                label="Apellidos"
                type="text"
                id="apellidos"
                v-model="form.apellidos"
                @input="slugify()"
              />
              <TextInput
                label="Slug"
                type="text"
                id="slug"
                v-model="form.slug"
                disabled="true"
              />
              <TextInput label="DNI" type="text" id="dni" v-model="form.dni" />
              <TextInput
                label="Teléfono"
                type="text"
                id="telefono"
                v-model="form.telefono"
              />
              <TextInput
                label="Fecha de Nacimiento"
                type="date"
                id="fecha_nacimiento"
                v-model="form.fecha_nacimiento"
              />
              <TextInput
                label="Edad"
                type="number"
                id="edad"
                min="1"
                max="100"
                v-model="form.edad"
              />
              <SelectInput label="Sexo" id="sexo" v-model="form.sexo">
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
                    :value="departamento.id">
                    {{ departamento.nombre }}
                  </option>
                </template>
              </SelectInput>
              <SelectInput
                label="Ciudad"
                id="ciudade_id"
                v-model="form.ciudade_id">
                <template #options>
                  <option :value="null"></option>
                  <option
                    v-for="ciudade in ciudades"
                    :key="ciudade.id"
                    :value="ciudade.id">
                    {{ ciudade.nombre }}
                  </option>
                </template>
              </SelectInput>
              <TextInput
                label="Dirección"
                type="text"
                id="direccion"
                v-model="form.direccion"
              />
              <TextInput
                label="Correo"
                type="email"
                id="email"
                v-model="form.email"
              />
              <TextInput
                label="Contraseña"
                type="password"
                id="password"
                placeholder="Déjala en blanco si no deseas cambiarla"
                v-model="form.password"
              />
              <SelectInput label="Rol" id="role_id" v-model="form.role_id">
                <template #options>
                  <option :value="null"></option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.nombre }}
                  </option>
                </template>
              </SelectInput>
              <button
                type="submit"
                class="h-10 w-72 bg-primary text-white shadow font-bold rounded-lg text-sm hover:bg-primary-light hover:text-primary md:mt-8">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
