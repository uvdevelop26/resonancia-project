<script setup>
import { computed } from "vue";
import AlertIcons from "./icons/AlertIcons.vue";
import Close from "./icons/Close.vue";

const props = defineProps({
  type: String,
  message: String,
});

const customColor = computed(() => {
  if (props.type === "success") {
    return "green-600";
  }
  return null;
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
  <div
    class="absolute w-full h-48 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border-t-4 bg-white shadow rounded-b-md max-w-96 md:h-52"
    :class="{'border-t-green-600': customColor === 'green-600'}">
    <div class="text-right px-4 py-2">
      <button type="button" aria-label="close alert" @click="close">
        <Close class="w-5 h-5 fill-gray-300" />
      </button>
    </div>
    <div class="p-4">
      <div class="flex justify-center">
        <AlertIcons
          name="success"
          class="w-16 h-16"
          :class="{'fill-green-600': customColor === 'green-600'}"
        />
      </div>
      <p class="pt-2 text-center italic" :class="{'text-green-600': customColor === 'green-600'}">
        {{ message }}
      </p>
    </div>
  </div>
</template>
