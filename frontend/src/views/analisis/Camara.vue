<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import Camara from "@/components/icons/Camara.vue";
import axios from "axios";

import { onMounted, ref, onBeforeUnmount } from "vue";

const canvas = ref(null);
const video = ref(null);
const ctx = ref(null);
let animationFrameId = null;

const constraints = ref({
  audio: false,
  video: true,
});

const setStream = (stream) => {
  video.value.srcObject = stream;
  video.value.play();

  animationFrameId = requestAnimationFrame(draw);
};

const draw = () => {
  if (canvas.value && ctx.value && video.value) {
    ctx.value.drawImage(
      video.value,
      0,
      0,
      canvas.value.width,
      canvas.value.height
    );
    animationFrameId = requestAnimationFrame(draw);
  }
};

const storePicture = async () => {
  try {
    const picture = canvas.value.toDataURL("image/png"); // Obtén la imagen en formato base64
    const blob = await fetch(picture).then((res) => res.blob()); // Convierte la imagen a Blob para enviarla
    const formData = new FormData();
    formData.append("file", blob, `imagen-${Date.now()}.png`); // Adjunta la imagen a formData

    // Envía la imagen al backend
    await axios.post(`http://localhost:3000/api/imagenes/store`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Imagen almacenada correctamente");
  } catch (error) {
    console.error("Error al almacenar la imagen:", error);
  }
}; 

const takePicture = () => {
  const link = document.createElement("a");
  link.download = `vue-cam-${new Date().toISOString()}.png`;
  link.href = canvas.value.toDataURL();
  link.click();
};

onMounted(async () => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext("2d");

    await navigator.mediaDevices
      .getUserMedia(constraints.value)
      .then(setStream)
      .catch((e) => {
        console.error(e);
      });
  }
});

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  if (video.value && video.value.srcObject) {
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
});
</script>

<template>
  <AppLayout :title="`Análisis`">
    <template #content>
      <div class="w-full h-full overflow-y-auto">
        <div
          class="w-full flex flex-col items-center max-w-2xl mx-auto max-h-[35rem]"
        >
          <video
            ref="video"
            autoplay
            playsinline
            webkit-playsinline
            muted
            hidden
          ></video>
          <!-- canvas -->
          <canvas
            ref="canvas"
            width="250"
            height="240"
            class="bg-black rounded-3xl w-full h-full"
          ></canvas>
          <!-- control -->
          <div class="flex items-center justify-center py-4">
            <button @click="storePicture" type="button">
              <Camara class="w-12 h-12 fill-primary hover:fill-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
