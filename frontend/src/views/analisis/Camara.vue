<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import Camara from "@/components/icons/Camara.vue";

import { onMounted, ref, onBeforeUnmount } from "vue";

const canvas = ref(null);
const video = ref(null);
const ctx = ref(null);
let animationFrameId = null;

const constraints = ref({
  audio: false,
  video: true,
});

onMounted(async () => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext("2d");

    await navigator.mediaDevices
      .getUserMedia(constraints.value)
      .then(SetStream)
      .catch((e) => {
        console.error(e);
      });
  }
});

onBeforeUnmount(() => {
  // Detiene la animación cuando el componente se desmonta
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  // Apaga la cámara
  if (video.value && video.value.srcObject) {
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
});

function SetStream(stream) {
  video.value.srcObject = stream;
  video.value.play();

  animationFrameId = requestAnimationFrame(Draw);
}

function Draw() {
  if (canvas.value && ctx.value && video.value) {
    ctx.value.drawImage(
      video.value,
      0,
      0,
      canvas.value.width,
      canvas.value.height
    );
    animationFrameId = requestAnimationFrame(Draw);
  }
}

function TakePicture() {
  const link = document.createElement("a");
  link.download = `vue-cam-${new Date().toISOString()}.png`;
  link.href = canvas.value.toDataURL();
  link.click();
}
</script>

<template>
  <AppLayout :title="`Análisis`">
    <template #content>
      <div class="w-full h-full overflow-y-auto">
        <div class="w-full flex flex-col items-center max-w-2xl mx-auto max-h-[35rem]">
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
            <button @click="TakePicture" class="">
              <Camara class="w-12 h-12 fill-primary hover:fill-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
