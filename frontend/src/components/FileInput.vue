<script setup>
import { ref, defineEmits, computed, watchEffect } from "vue";
import Upload from "./icons/Upload.vue";
import ImageViewer from "./ImageViewer.vue";

const props = defineProps({
  id: String,
  accept: String,
  label: String,
  multiple: Boolean,
  placeholder: String,
  error: Array,
  maxWidth: {
    type: String,
    default: "2xl",
  },
  cleanPreview: Boolean,
});

const photosPreview = ref([]);
const fileNames = ref([]);
const filesArray = ref([]);

const emit = defineEmits(["update:modelValue"]);

const fileHandler = (event) => {
  const files = event.target.files;
  if (!files.length) return;

  const filesArrayTmp = [];

  for (const file of files) {
    fileNames.value.push(file.name);
    filesArrayTmp.push(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      photosPreview.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  filesArray.value = filesArrayTmp;
  emit("update:modelValue", filesArray.value);
};

watchEffect(() => {
  const photosPreviewState = props.cleanPreview;

  if (photosPreviewState === true) {
    photosPreview.value = [];
  }
});

const maxWidthClass = computed(() => {
  return {
    xs: "sm:max-w-xs",
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  }[props.maxWidth];
});

const errorClasess = computed(() => {
  return props.error ? "border-b-red-500" : "";
});

const handleRemoveImage = (index) => {
  photosPreview.value.splice(index, 1);
  fileNames.value.splice(index, 1);
  filesArray.value.splice(index, 1);
  emit("update:modelValue", filesArray.value);
};

</script>
<template>
  <div class="flex flex-col gap-2 w-full relative" :class="maxWidthClass">
    <span class="font-bold">{{ label }}:</span>
    <!-- input -->
    <label
      :for="id"
      class="w-full block h-10 px-2 overflow-hidden relative border-b cursor-pointer bg-gray-100"
      :class="errorClasess"
    >
      <Upload
        class="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-2 fill-gray-400"
      />
      <input
        type="file"
        :accept="accept"
        :id="id"
        class="opacity-0 absolute -z-10"
        :multiple="multiple"
        @change="fileHandler"
      />
      <span
        class="absolute w-28 top-1/2 -translate-y-1/2 text-xs text-gray-400 italic left-10"
      >
        {{ placeholder }}
      </span>
    </label>
    <!-- error -->
    <div v-if="error" class="text-xs text-red-500">{{ error[0].msg }}</div>
    <!-- previsualizer -->
    <ImageViewer
      :show="photosPreview.length > 0"
      :images="photosPreview"
      @remove="handleRemoveImage"
    />
    <!-- <ul
      v-if="photosPreview.length > 0"
      class="h-32 w-full flex gap-2 overflow-x-auto flex-nowrap">
      <li
        v-for="(photo, index) in photosPreview"
        :key="index"
        class="w-32 h-full relative border-2 flex-shrink-0 shadow-md">
        <img
          :src="photo"
          alt="Previsualización"
          class="w-full h-full object-cover"
        />
        <button
          type="button"
          class="absolute bottom-4 right-4 w-6 h-6 flex items-center justify-center rounded-full bg-primary hover:shadow-xl"
          @click="deleteImg(index)">
          <Close class="w-3 h-3 fill-white" />
        </button>
      </li>
    </ul> -->
  </div>
</template>
