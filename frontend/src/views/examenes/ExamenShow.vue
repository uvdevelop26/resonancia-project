<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import TextInput from "@/components/TextInput.vue";
import TextArea from "@/components/TextArea.vue";
import QuestionFlash from "@/components/QuestionFlash.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { Utilities } from "@/js/Utilities";
import { useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const examene = ref({});
const fechaExamene = ref("");
const user = ref("");
const resultado = ref("");
const urls = ref([]);
const users = ref({});
const questionFlash = ref(false);
const exameneTot = ref({});
const message = ref("");

const url = (directory) => {
  const url = `http://localhost:3000${directory}`;
  return url;
};

const showQuestionFlash = () => {
  questionFlash.value = true;
};

const close = () => {
  questionFlash.value = false;
};

const deleteExamen = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/examenes/delete/${exameneTot.value.id}`
    );

    message.value = response.data.msg;

    router.push({
      path: "/examenes",
      query: { message: response.data.msg },
    });
      
  } catch (error) {
    console.error("Error al cargar el examen:", error);
  }
};

const fetchData = async () => {
  try {
    const { id } = route.params;

    const response = await axios.get(
      `http://localhost:3000/api/examenes/show/${id}`
    );

    const examene = response.data;
    exameneTot.value = examene;

    fechaExamene.value = Utilities.getFormattedDate(examene.fecha_examene);
    users.value = examene.user;
    user.value = `${examene.user.personas[0].nombre} ${examene.user.personas[0].apellido}`;
    resultado.value = examene.resultado;

    examene.imagenes.forEach((image) => {
      const url = image.url;
      urls.value.push(url);
    });
  } catch (error) {
    console.error("Error al cargar el examen:", error);
  }
};

onMounted(fetchData);
</script>
<template>
  <AppLayout :title="`Examen ${examene.fecha_examene}`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5 relative">
        <!-- question flas -->
        <QuestionFlash
          :show="questionFlash"
          title="¿Desea eliminar este Examen?"
          @close="close"
          @continues="deleteExamen()"
        />
        <div class="w-full rounded-lg bg-white shadow-md p-4 lg:p-6 mt-4">
          <form class="flex flex-col gap-4">
            <div
              class="flex flex-col gap-4 w-full items-center md:flex-row md:items-start md:flex-wrap"
            >
              <TextInput
                label="Fecha"
                type="date"
                id="fecha_examen"
                v-model="fechaExamene"
                :disabled="true"
              />

              <TextInput
                label="Paciente"
                type="text"
                id="user"
                v-model="user"
                :disabled="true"
              />
              <TextArea
                label="Resultados"
                id="resultado"
                v-model="resultado"
                placeholder="Los resultados se generarán en segundos.."
                :disabled="true"
              />

              <div class="flex flex-col gap-2 w-full relative">
                <div class="font-bold">Imágenes:</div>
                <ul
                  v-if="urls"
                  class="h-52 w-full flex gap-2 overflow-x-auto flex-nowrap"
                >
                  <li
                    v-for="(urlimg, index) in urls"
                    :key="index"
                    class="w-64 h-full relative border-2 flex-shrink-0 shadow-md"
                  >
                    <img
                      :src="url(urlimg)"
                      alt="Previsualización"
                      class="w-full h-full object-cover"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col gap-4 w-full items-center md:flex-row">
              <button
                type="button"
                @click="showQuestionFlash()"
                class="h-10 w-72 bg-red-500 self-center text-white shadow font-bold rounded-lg text-sm hover:bg-red-200 hover:text-red-500 md:mt-8"
              >
                Eliminar
              </button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
