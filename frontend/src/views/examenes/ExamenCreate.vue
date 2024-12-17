<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import TextInput from "@/components/TextInput.vue";
import TextArea from "@/components/TextArea.vue";
import SearchInput from "@/components/SearchInput.vue";
import FlashMessage from "@/components/FlashMessage.vue";
import { Utilities } from "@/js/Utilities";
import { Constants } from "@/js/Contants";
import { onMounted, ref, watchEffect } from "vue";
import axios from "axios";
import FileInput from "@/components/FileInput.vue";

const pacientes = ref([]);
const search = ref("");
const errors = ref({});
const handlePreview = ref(false);
const message = ref("");

const form = ref({
  fecha: "",
  resultado: "",
  user_id: "",
  url: [],
});

const close = () => {
  Utilities.close(message);
};

const cleanFormEx = () => {
  Utilities.cleanForm(form);
  search.value = "";
  handlePreview.value = true;
};

const action = () => {
  const value = search.value;
  const parts = value.split(" ");
  const dni = parts[parts.length - 1];

  form.value.user_id = "";

  const user = pacientes.value.filter(
    (paciente) => paciente.persona.dni === dni
  );

  form.value.user_id = user[0].id;
};

watchEffect(() => {
  const value = search.value;
  if (!value) {
    form.value.user_id = "";
  }
});

const store = async () => {
  const formData = new FormData();

  formData.append("fecha", form.value.fecha);
  formData.append("resultado", form.value.resultado);
  formData.append("user_id", form.value.user_id);

  form.value.url.forEach((file) => {
    formData.append("url", file);
  });

  try {
    const response = await axios.post(
      `${Constants.serverPath}/api/examenes/store`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    cleanFormEx();

    message.value = response.data.msg;

    errors.value = {};
  } catch (error) {
    if (error.response) {
      message.value = error.response.data.msg;

      if (error.response.data.errors) {
        errors.value = Utilities.manageValidationErrors(
          error.response.data.errors
        );
      }

      console.error("Error en el login:");
    } 
  }
};

const fetchData = async () => {
  try {
    const response = await axios.get(
      `${Constants.serverPath}/api/examenes/create`
    );

    pacientes.value = response.data;

    console.log(pacientes.value)
  } catch (error) {
    console.error("Error en el servidor", error);
  }
};

onMounted(fetchData);
</script>
<template>
  <AppLayout :title="`Nuevo Análisis`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5 relative">
        <!-- flash message -->
        <FlashMessage
          v-if="message"
          type="success"
          title="Operación exitosa"
          :message="message"
          @close="close"
        />
        <!-- form -->
        <div class="w-full rounded-lg bg-white shadow-md p-4 lg:p-6 mt-4">
          <form @submit.prevent="store" class="flex flex-col gap-4">
            <div
              class="flex flex-col gap-4 w-full items-center md:flex-row md:items-start md:flex-wrap"
            >
              <TextInput
                label="Fecha"
                type="date"
                id="fecha"
                v-model="form.fecha"
                :error="errors.fecha"
                maxWidth="sm"
              />
              <SearchInput
                placeholder="Ingresa nombre, apellido o CI. Selecciona en la lista"
                id="user_id"
                label="Buscar Paciente"
                v-model="search"
                :data="pacientes"
                :criteria="['nombre', 'apellido', 'dni']"
                :error="errors.user_id"
                @action="action"
                maxWidth="sm"
              />
              <FileInput
                label="Selecciona Archivo"
                id="url"
                accept=".jpeg, .jpg, .png"
                multiple="true"
                placeholder=".jpeg, .jpg, .png"
                maxWidth="sm"
                v-model="form.url"
                :error="errors.url"
                :clean-preview="handlePreview"
              />
              <TextArea
                label="Resultados"
                id="resultado"
                maxWidth="sm"
                v-model="form.resultado"
                :error="errors.resultado"
                placeholder="Los resultados se generarán en segundos.."
              />
            </div>
            <div class="flex flex-col gap-4 w-full items-center md:flex-row">
              <button
                type="submit"
                class="h-10 w-72 bg-primary self-center text-white shadow font-bold rounded-lg text-sm hover:bg-primary-light hover:text-primary md:mt-8"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
