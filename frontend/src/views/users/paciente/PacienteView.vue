<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import FlashMessage from "@/components/FlashMessage.vue";
import QuestionFlash from "@/components/QuestionFlash.vue";
import SearchInput from "@/components/SearchInput.vue";
import { ref, onMounted } from "vue";
import { Utilities } from "@/js/Utilities";
import axios from "axios";

const users = ref([]);
const message = ref("");
const questionFlashIndex = ref(null);
const search = ref("");

const close = () => {
  Utilities.close(message);
};

const closeQuestiosFlash = () => {
  questionFlashIndex.value = null;
};

const showQuestionFlash = (index) => {
  questionFlashIndex.value = index;
};

const deleteUser = async (slug) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/users/delete/${slug}`
    );

    questionFlashIndex.value = null;

    setTimeout(() => {
      message.value = response.data.msg;
    }, 300);

    /* Filtra el usuario eliminado de la lista de usuarios */
    users.value = users.value.filter((user) => user.personas[0].slug !== slug);
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/users/paciente"
    );
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchUsers);
</script>
<template>
  <AppLayout :title="`Lista de Pacientes`">
    <template #content>
      <div class="w-full h-full overflow-y-auto flex flex-col gap-5 relative">
        <!-- flash message -->
        <FlashMessage
          v-if="message"
          type="success"
          title="Operación Exitosa"
          :message="message"
          @close="close"
        />

        <!-- search bar -->
        <div
          class="w-full flex justify-between gap-2 items-center mt-4 md:gap-8"
        >
          <!--  <SearchInput v-model="search" /> -->
          <router-link
            to="/users/pacientes/create"
            class="w-28 h-8 text-white font-bold bg-primary flex items-center justify-center rounded-lg shadow-lg hover:bg-primary-light hover:text-primary hover:border"
          >
            Crear
          </router-link>
        </div>
        <!-- table -->
        <div class="w-full overflow-x-auto rounded-lg bg-white shadow-md">
          <table class="w-full text-sm whitespace-nowrap overflow-hidden">
            <thead>
              <tr class="h-12 shadow text-sm border-b-2">
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold"
                >
                  N°
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold"
                >
                  Nombre
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold"
                >
                  Apellido
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold"
                >
                  CI
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold"
                >
                  Ciudad
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold"
                >
                  Dirección
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold"
                >
                  Correo
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="h-14 text-center shadow group border-b-2"
                v-for="(user, index) in users"
                :key="user.id"
              >
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100"
                >
                  {{ index + 1 }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100"
                >
                  {{ user.personas?.[0]?.nombre || "Nombre no disponible" }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100"
                >
                  {{ user.personas?.[0]?.apellido || "Apellido no disponible" }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100"
                >
                  {{ user.personas?.[0]?.dni || "DNI no disponible" }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100"
                >
                  {{
                    user.personas?.[0]?.ciudade?.ciudade_nombre ||
                    "Ciudad no disponible"
                  }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100"
                >
                  {{
                    user.personas?.[0]?.direccion || "Dirección no disponible"
                  }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100"
                >
                  {{ user.email || "Correo no disponible" }}
                </td>
                <td
                  class="py-1 px-1 text-sm md:text-xs bg-white group-hover:bg-gray-100"
                >
                  <div
                    class="w-full h-full flex items-center justify-center gap-2"
                  >
                    <router-link
                      :to="`/users/pacientes/edit/${
                        user.personas?.[0]?.slug || ''
                      }`"
                      class="inline-block border bg-primary-light px-3 py-3 rounded-full bg-light-green-two hover:shadow-md"
                    >
                      <Edit class="w-3 h-3 fill-primary" />
                    </router-link>
                    <button
                      @click="showQuestionFlash(index)"
                      class="inline-block border bg-primary-light px-3 py-3 rounded-full bg-light-green-two hover:shadow-md"
                    >
                      <Delete class="w-3 h-3 fill-primary" />
                    </button>
                  </div>
                </td>
                <QuestionFlash
                  :show="questionFlashIndex === index"
                  title="¿Desea eliminar este usuario?"
                  :data="user.personas?.[0] || {}"
                  @continues="deleteUser(user.personas?.[0]?.slug)"
                  @close="closeQuestiosFlash"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
