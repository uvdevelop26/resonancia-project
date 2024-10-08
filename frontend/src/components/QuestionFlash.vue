<script setup>
import { onMounted, computed, ref } from "vue";
import { gsap } from "gsap";
import AlertIcons from "./icons/AlertIcons.vue";
import Modal from "./Modal.vue";

const props = defineProps({
  title: String,
  message: String,
});
</script>
<template>
  <Modal :show="message" maxWidth="xs">
    <div ref="alertRef" class="w-full h-40 p-4">
      <div class="flex items-center gap-2">
        <div
          class="w-7 h-7 bg-orange-600 rounded-full flex items-center justify-center">
          <AlertIcons :name="props.type" class="w-3 h-3 fill-white" />
        </div>
        <p class="font-bold">
          {{ title }}
        </p>
      </div>
      <p class="pt-3 pb-4">{{ message }}</p>
      <div class="text-right pt-4 border-t">
        <button
          type="button"
          aria-label="close alert"
          @click="close"
          class="w-16 h-8 rounded-lg text-sm text-white font-bold bg-orange-600 hover:text-orange-600 hover:bg-green-200">
          Cerrar
        </button>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped></style>
