<script setup>
import { computed } from "vue"
const props = defineProps({
  label: String,
  modelValue: String,
  id: String,
  disabled: Boolean,
  placeholder: String,
  error: Array
});

const errorClasess = computed(() => {
  return props.error ? "border-b-red-500" : "";
});

defineEmits(["update:modelValue"]);
</script>
<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="font-bold">{{ label }}:</label>
    <select
      class="h-9 w-72 px-2 text-sm text-primary bg-gray-100 border-b cursor-pointer placeholder:text-xs placeholder:italic focus:outline-none md:w-[17rem]"
      :class="errorClasess"
      :value="modelValue"
      :id="id"
      @input="$emit('update:modelValue', $event.target.value)">
      <slot name="options" />
    </select>
    <div v-if="error" class="text-xs text-red-500">{{ error[0].msg }}</div>
  </div>
</template>
