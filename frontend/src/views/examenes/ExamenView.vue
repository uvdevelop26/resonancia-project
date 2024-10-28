<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import Card from "@/components/Card.vue";
import { Utilities } from "@/js/Utilities";
import User from "@/components/icons/User.vue";
import { useRoute, useRouter } from "vue-router";
import { Constants } from "@/js/Contants";
import { onMounted, ref } from "vue";
import FlashMessage from "@/components/FlashMessage.vue";
import axios from "axios";
import gsap from "gsap";

const route = useRoute();
const router = useRouter();
const examenes = ref([]);
const user = ref(null);
const message = ref("");
const showDeleteSuccess = ref(false);


const close = () => {
  Utilities.close(message);
  showDeleteSuccess.value = false;
};

const fetchData = async () => {
  try {
    const userResponse = await axios.get(
      `${Constants.serverPath}/api/auth/userinfo`
    );

    const examenesResponse = await axios.get(
      `${Constants.serverPath}/api/examenes/`
    );

    user.value = userResponse.data.user;

    if(route.query.message !== ""){
      message.value = route.query.message;
      showDeleteSuccess.value = true;

      router.replace({ query: { ...route.query, message: undefined } });
    }

    if (user.value.role_id === 2) {
      examenes.value = examenesResponse.data.filter(
        (examene) => examene.user.id === user.value.id
      );
    } else {
      examenes.value = examenesResponse.data;
    }
  } catch (error) {
    console.error("Error al obtener los datos", error);
  }
};

const beforeEnter = (el) => {
  el.style.transform = "translateY(60px)"; 
  el.style.opacity = 0;
};

const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.6,
    y: 0, 
    opacity: 1,
    onComplete: done,
    delay: el.dataset.index * 0.1,
    ease: "power3.out"
  });
};


onMounted(fetchData);
</script>

<template>
  <AppLayout title="Análisis Realizados">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5 relative">
        <!-- mesage flash -->
        <FlashMessage
          v-if="showDeleteSuccess"
          type="success"
          title="Operación Exitosa"
          :message="message"
          @close="close"
        />
        <div
          class="w-full flex justify-between gap-2 items-center mt-4 md:gap-8">
          <!-- <SearchInput /> -->
          <router-link
            to="/examenes/create"
            class="w-28 h-8 text-white font-bold bg-primary flex items-center justify-center rounded-lg shadow-lg hover:bg-primary-light hover:text-primary hover:border">
            Nuevo
          </router-link>
        </div>
        <transition-group
          tag="div"
          class="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-6"
          appear
          @before-enter="beforeEnter"
          @enter="enter">
          <template v-for="(examene, index) in examenes" :key="examene.id">
            <card :href="`/examenes/show/${examene.id}`" :data-index="index">
              <template #content>
                <figure class="rounded-lg h-40 w-full overflow-hidden">
                  <img
                    v-if="Array.isArray(examene.imagenes)"
                    :src="Utilities.absolutePath(examene.imagenes[0].url)"
                    :alt="examene.imagenes[0].url"
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
                  class="text-sm h-24 w-full flex flex-col justify-center relative">
                  <h1
                    class="flex justify-between items-center font-bold text-primary text-sm underline">
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
                  <p>{{ Utilities.shortingString(examene.resultado) }}</p>
                  <span class="absolute bottom-0 right-0 text-xs text-gray-500">
                    {{ Utilities.getFormattedDate(examene.fecha_examene) }}
                  </span>
                </div>
              </template>
            </card>
          </template>
        </transition-group>
      </div>
    </template>
  </AppLayout>
</template>
