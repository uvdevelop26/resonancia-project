<script setup>
import { computed } from "vue";

const props = defineProps({
  label: String,
  type: String,
  modelValue: String,
  id: String,
  disabled: Boolean,
  placeholder: String,
  error: Array,
  min: Number,
  max: Number,
});

defineEmits(["update:modelValue"]);

const disabledClasses = computed(() => {
  return props.disabled ? "bg-gray-200 border-b-gray-300" : "";
});

const errorClasess = computed(() => {
  return props.error ? "border-b-red-500" : "";
});

</script>
<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="font-bold">{{ label }}:</label>
    <input
      :type="type"
      class="h-9 w-72 px-2 text-sm text-primary bg-gray-100 border-b placeholder:text-xs placeholder:italic focus:outline-none md:w-[17rem]"
      :class="[disabledClasses, errorClasess]"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      @input="$emit('update:modelValue', $event.target.value)"
      autocomplete="off"
      :disabled="disabled"
    />
    <div v-if="error" class="text-xs text-red-500">{{ error[0].msg }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
