<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import { onMounted, ref } from "vue";
import axios from "axios";

const imagenes = ref([]);

const fetchImages = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/imagenes/`);

    imagenes.value = response.data;

    console.log(imagenes.value);
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};

onMounted(fetchImages);
</script>

<template>
  <AppLayout :title="`Dashboard`">
    <template #content>
      <div class="w-full h-full overflow-y-auto">
        <h2 class="text-primary font-bold pb-4">Últimos Análisis Realizados</h2>
        <div v-if="imagenes.length" class="flex flex-col gap-2 md:flex-row">
          <div
            v-for="image in imagenes"
            :key="image.id"
            class="w-full h-64 max-w-96 overflow-hidden rounded-md"
          >
            <img
              :src="`http://localhost:3000${image.url}`"
              alt="analisis"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div v-else class="text-sm text-primary italic">
          No has realizado análsis
        </div>
      </div>
    </template>
  </AppLayout>
</template>
