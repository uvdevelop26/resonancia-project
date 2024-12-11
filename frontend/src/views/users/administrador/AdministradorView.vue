<script setup>
import AppLayout from "@/components/layout/AppLayout.vue";
import Edit from "@/components/icons/Edit.vue";
import Delete from "@/components/icons/Delete.vue";
import FlashMessage from "@/components/FlashMessage.vue";
import QuestionFlash from "@/components/QuestionFlash.vue";
import { ref, onMounted } from "vue";
import { Utilities } from "@/js/Utilities";
import { Constants } from "@/js/Contants";
import axios from "axios";
import gsap from "gsap";

const users = ref([]);
const message = ref("");
const questionFlashIndex = ref(null);

const close = () => {
  Utilities.close(message);
};

const beforeEnter = (el) => {
  el.style.transform = "translateX(-60px)";
  el.style.opacity = 0;
};

const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.6,
    x: 0,
    opacity: 1,
    onComplete: done,
    delay: el.dataset.index * 0.1,
    ease: "power3.out",
  });
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `${Constants.serverPath}/api/users/administrador`
    );
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (slug) => {
  try {
    const response = await axios.delete(
      `${Constants.serverPath}/api/users/delete/${slug}`
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

onMounted(fetchUsers);
</script>
<template>
  <AppLayout :title="`Lista de Administradores`">
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
          class="w-full flex justify-between gap-2 items-center mt-4 md:gap-8">
          <!--    <SearchInput v-model="search" /> -->
          <router-link
            to="/users/administradores/create"
            class="w-28 h-8 text-white font-bold bg-primary flex items-center justify-center rounded-lg shadow-lg hover:bg-primary-light hover:text-primary hover:border">
            Crear
          </router-link>
        </div>
        <!-- table -->
        <div class="w-full overflow-x-auto rounded-lg bg-white shadow-md">
          <table class="w-full text-sm whitespace-nowrap overflow-hidden">
            <thead>
              <tr class="h-12 shadow text-sm border-b-2">
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  N°
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Nombre
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Apellido
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  CI
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Dirección
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Correo
                </th>
                <th
                  class="py-3 px-4 text-gray-500 text-xs md:text-sm font-bold">
                  Acciones
                </th>
              </tr>
            </thead>
            <transition-group
              tag="tbody"
              @before-enter="beforeEnter"
              @enter="enter"
              appear>
              <tr
                class="h-14 text-center shadow group"
                v-for="(user, index) in users"
                :key="user.id"
                :data-index="index">
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ index + 1 }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.personas[0].nombre }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.personas[0].apellido }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.personas[0].dni }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.personas[0].ciudade.ciudade_nombre }}
                </td>
                <td
                  class="py-1 px-1 text-xs md:text-sm bg-white group-hover:bg-gray-100">
                  {{ user.email }}
                </td>
                <td
                  class="py-1 px-1 text-sm md:text-xs bg-white group-hover:bg-gray-100">
                  <div
                    class="w-full h-full flex items-center justify-center gap-2">
                    <router-link
                      :to="`/users/administradores/edit/${user.personas[0].slug}`"
                      class="inline-block border bg-primary-light px-3 py-3 rounded-full bg-light-green-two hover:shadow-md">
                      <Edit class="w-3 h-3 fill-primary" />
                    </router-link>
                    <button
                      @click="questionFlashIndex = index"
                      class="inline-block border bg-primary-light px-3 py-3 rounded-full bg-light-green-two hover:shadow-md">
                      <Delete class="w-3 h-3 fill-primary" />
                    </button>
                  </div>
                </td>
                <QuestionFlash
                  :show="questionFlashIndex === index"
                  title="¿Desea eliminar este usuario?"
                  :data="`Eliminar a ${user.personas[0].nombre} ${user.personas[0].apellido}`"
                  @continues="deleteUser(user.personas[0].slug)"
                  @close="questionFlashIndex = null"
                />
              </tr>
            </transition-group>
          </table>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
