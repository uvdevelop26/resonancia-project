<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import TextInput from "@/components/TextInput.vue";
import SelectInput from "@/components/SelectInput.vue";
import FlashMessage from "@/components/FlashMessage.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";
import { Utilities } from "@/js/Utilities";

const route = useRoute();

/*  values */
const roles = ref(null);
const ciudades = ref([]);
const departamentos = ref([]);
const message = ref("");
const errors = ref({});

/* form edit */
const form = ref({
  /* persona */
  nombre: "",
  apellido: "",
  slug: "",
  dni: "",
  telefono: "",
  fecha_nacimiento: "",
  sexo: "",
  direccion: "",
  edad: "",
  ciudade_id: "",
  departamento_id: "",
  /* user */
  email: "",
  password: "",
  role_id: "",
  profile_photo_path: "",
});

/* functions */

const close = () => {
  Utilities.close(message);
};

const getCurrentDptoId = (ciudades, ciudade_id) => {
  const ciudad = ciudades.filter((ciudade) => ciudade.id === ciudade_id);
  const departamentoId = ciudad[0].departamento_id;
  return departamentoId;
};

const getSlug = () => {
  const slug = Utilities.slugify(form.value.nombre, form.value.apellido);
  form.value.slug = slug;
};

/* update user */

const update = async () => {
  const { slug } = route.params;

  try {
    const response = await axios.put(
      `http://localhost:3000/api/users/update/${slug}`,
      form.value
    );

    message.value = response.data.msg;
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

/* fetch data */

const fetchData = async () => {
  const { slug } = route.params;

  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/edit/${slug}`
    );

    /* getting data */
    roles.value = response.data.roles;

    const departamentosData = response.data.departamentos;
    const persona = response.data.persona;
    const user = response.data.user;

    departamentosData.forEach((departamento) => {
      departamento.ciudades.forEach((ciudade) => {
        ciudades.value.push(ciudade);
      });
    });

    departamentosData.forEach((departamento) => {
      delete departamento.ciudade;
      departamentos.value.push(departamento);
    });

    /* filling form */
    const departamentoId = getCurrentDptoId(
      ciudades.value,
      response.data.persona.ciudade_id
    );

    const formattedDateBday = Utilities.getFormattedDate(
      persona.fecha_nacimiento
    );

    form.value = {
      id: user.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      slug: persona.slug,
      dni: persona.dni,
      telefono: persona.telefono,
      fecha_nacimiento: formattedDateBday,
      edad: persona.edad,
      sexo: persona.sexo,
      ciudade_id: persona.ciudade_id,
      departamento_id: departamentoId,
      direccion: persona.direccion,
      email: user.email,
      role_id: user.role_id,
      password: "",
    };
  } catch (error) {
    console.error("Error al cargar el usuario:", error);
    message.value = error.response.data.message || "Error al crear el usuario";
  }
};

onMounted(fetchData);
</script>
<template>
  <AppLayout :title="`Editar Usuario`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5 relative">
        <!-- flash message -->
        <FlashMessage
          v-if="message"
          type="success"
          title="Operación Exitosa"
          :message="message"
          @close="close"
        />
        <!-- form -->
        <div class="w-full rounded-lg bg-white shadow-md p-4 lg:p-6 mt-4">
          <form @submit.prevent="update" class="flex flex-col gap-4">
            <div
              class="flex flex-col gap-4 w-full items-center md:flex-row md:flex-wrap"
            >
              <TextInput
                label="Nombre"
                type="text"
                id="nombre"
                :error="errors.nombre"
                v-model="form.nombre"
                @input="getSlug()"
              />
              <TextInput
                label="Apellidos"
                type="text"
                id="apellidos"
                :error="errors.apellidos"
                v-model="form.apellido"
                @input="getSlug()"
              />
              <TextInput
                label="Slug"
                type="text"
                id="slug"
                :error="errors.slug"
                v-model="form.slug"
                disabled="true"
              />
              <TextInput label="DNI" type="text" id="dni" v-model="form.dni" />
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
                    :value="departamento.id">
                    {{ departamento.departamento_nombre }}
                  </option>
                </template>
              </SelectInput>
              <SelectInput
                label="Ciudad"
                id="ciudade_id"
                :error="errors.ciudade_id"
                v-model="form.ciudade_id">
                <template #options>
                  <option :value="null"></option>
                  <option
                    v-for="ciudade in ciudades"
                    :key="ciudade.id"
                    :value="ciudade.id">
                    {{ ciudade.ciudade_nombre }}
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
                placeholder="Déjala en blanco si no deseas cambiarla"
                :error="errors.password"
                v-model="form.password"
              />
              <SelectInput
                label="Rol"
                id="role_id"
                :error="errors.role_id"
                v-model="form.role_id">
                <template #options>
                  <option :value="null"></option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.role_nombre }}
                  </option>
                </template>
              </SelectInput>
              <button
                type="submit"
                class="h-10 w-72 bg-primary text-white shadow font-bold rounded-lg text-sm hover:bg-primary-light hover:text-primary md:mt-8">
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
