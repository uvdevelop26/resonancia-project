<script setup>
import Search from "./icons/Search.vue";
import { ref, watchEffect, computed } from "vue";

const props = defineProps({
  placeholder: String,
  id: String,
  modelValue: String,
  label: String,
  data: Array,
  /* criterio de la búsqueda */
  criteria: Array,
  error: Array,
  maxWidth: {
    type: String,
    default: "2xl",
  },
});

const filteredData = ref([...props.data]);
const showList = ref(false);
const showOnList = ref([]);

const cleanSearch = (event) => {
  if (event.key === "Backspace") {
    emit("update:modelValue", "");
  }
};

const generateShowText = (data) => {
  const criteria = props.criteria;
  const showData = criteria.map((crit) => data[crit]).join(" ");

  return showData;
};

const select = (data) => {
  const showData = generateShowText(data);

  emit("update:modelValue", showData);
  showList.value = false;
  emit("action");
};

watchEffect(() => {
  const searchData = props.modelValue.toLowerCase();
  const criteria = props.criteria;

  if (searchData) {
    showList.value = true;
    showOnList.value = filteredData.value.filter((data) => {
      // Verifica si alguno de los criterios coincide
      return criteria.some((crit) => {
        return data[crit]?.toLowerCase().includes(searchData);
      });
    });
  } else {
    showList.value = false;
    // Restablece los valores si no hay búsqueda
    showOnList.value = [];
  }
});

/* filtra los datos de acuerdo a los criterios */
watchEffect(() => {
  filteredData.value = [];

  const criteria = props.criteria;
  const data = props.data;

  criteria.forEach((crit) => {
    data.forEach((dat) => {
      for (let key in dat) {
        if (key === crit) {
          const exists = filteredData.value.some((item) => item.id === dat.id);
          if (!exists) {
            filteredData.value.push(dat);
          }
        }
        if (Array.isArray(dat[key])) {
          const subArray = dat[key];
          subArray.forEach((sub) => {
            for (let subKey in sub) {
              if (subKey === crit) {
                const subExists = filteredData.value.some(
                  (item) => item.id === sub.id
                );
                if (!subExists) {
                  filteredData.value.push(sub);
                }
              }
            }
          });
        }
      }
    });
  });
});

const errorClasess = computed(() => {
  return props.error ? "border-b-red-500" : "";
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

const emit = defineEmits(["update:modelValue", "action"]);
</script>
<template>
  <div class="flex flex-col gap-2 w-full relative" :class="maxWidthClass">
    <label v-if="label" :for="id" class="font-bold">{{ label }}:</label>
    <div
      class="w-full h-10 overflow-hidden relative border-b"
      :class="errorClasess">
      <Search
        class="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-2 fill-gray-400"
      />
      <input
        type="search"
        :id="id"
        :placeholder="placeholder"
        class="h-full w-full pl-9 pr-2 text-sm bg-gray-100 text-primary placeholder:text-xs placeholder:italic focus:outline-none"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keydown="cleanSearch"
      />
    </div>
    <!-- error -->
    <div v-if="error" class="text-xs text-red-500">{{ error[0].msg }}</div>
    <!-- list -->
    <ul
      v-if="showOnList.length > 0 && showList"
      class="absolute z-50 w-full py-2 border-2 bg-white shadow top-[4.655rem] max-h-52 overflow-y-auto">
      <li
        v-for="data in showOnList"
        :key="data.id"
        class="text-sm p-2 text-gray-500 hover:bg-gray-200">
        <button
          type="button"
          class="w-full h-full text-start"
          @click="select(data)">
          {{ generateShowText(data) }}
        </button>
      </li>
    </ul>
  </div>
</template>
