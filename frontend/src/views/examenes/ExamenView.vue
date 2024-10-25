<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import Card from "@/components/Card.vue";
import User from "@/components/icons/User.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const examenes = ref([]);
const user = ref(null);
const route = useRoute();

const url = (directory) => {
  const url = `http://localhost:3000${directory}`;
  return url;
};



const fetchData = async () => {
  try {
    // Primera llamada para obtener la información del usuario autenticado
    const userResponse = await axios.get("http://localhost:3000/api/auth/userinfo");
    user.value = userResponse.data.user;

    // Segunda llamada para obtener los exámenes
    const examenesResponse = await axios.get("http://localhost:3000/api/examenes/");

    // Filtrar los exámenes que pertenecen al usuario autenticado
    examenes.value = examenesResponse.data.filter(
      (examene) => examene.user.id === user.value.id
    );
  } catch (error) {
    console.error("Error al obtener los datos", error);
  }
};

onMounted(fetchData);
</script>

<template>
  <AppLayout :title="`Análisis`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5 relative">
        <div
          class="w-full flex justify-between gap-2 items-center mt-4 md:gap-8"
        >
          <!-- <SearchInput /> -->
          <router-link
            to="/examenes/create"
            class="w-28 h-8 text-white font-bold bg-primary flex items-center justify-center rounded-lg shadow-lg hover:bg-primary-light hover:text-primary hover:border"
          >
            Nuevo
          </router-link>
        </div>
        <div class="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-4">
          <template v-for="examene in examenes" :key="examene.id">
            <card :href="`/examenes/show/${examene.id}`">
              <template #content>
                <figure class="rounded-lg h-40 w-full overflow-hidden">
                  <img
                    v-if="
                      Array.isArray(examene.imagenes)
                    "
                    :src="url(examene.imagenes[0].url)"
                    alt=""
                    class="h-full w-full object-cover"
                  />
                  <img
                    v-else
                    src="https://cdn.pixabay.com/photo/2015/02/22/17/56/loading-645268_1280.jpg"
                    alt="No image available"
                    class="h-full w-full object-cover"
                  />
                </figure>
                <div
                  class="text-sm h-24 w-full flex flex-col justify-center relative"
                >
                  <h1
                    class="flex justify-between items-center font-bold text-primary text-sm underline"
                  >
                    {{
                      examene.user.personas?.[0]?.nombre ||
                      "Nombre no disponible"
                    }}
                    {{
                      examene.user.personas?.[0]?.apellido ||
                      "Apellido no disponible"
                    }}
                    <User class="w-3 h-3 fill-primary" />
                  </h1>
                  <p>{{ examene.resultado }}</p>
                  <span
                    class="absolute bottom-0 right-0 text-xs text-gray-500"
                  ></span>
                </div>
              </template>
            </card>
          </template>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
