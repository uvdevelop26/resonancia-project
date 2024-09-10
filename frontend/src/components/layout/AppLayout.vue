<script setup>
import ChevronDown from "../icons/ChevronDown.vue";
import Home from "../icons/Home.vue";
import User from "../icons/User.vue";
import Camara from "../icons/Camara.vue";
import Logo from "../icons/Logo.vue";
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const openSubmenu = ref(false);
</script>
<template>
  <div
    class="w-full h-full py-4 px-4 bg-primary flex flex-col justify-between gap-3 lg:flex-row-reverse">
    <!-- content -->
    <div
      class="h-full py-4 bg-gray-100 rounded-xl container flex flex-col gap-3 overflow-y-auto lg:rounded-2xl">
      <div
        class="h-16 p-4 flex justify-between items-center rounded-xl shadow bg-primary lg:rounded-2xl">
        <div class="flex items-center gap-1 lg:hidden">
          <span class="font-bold text-white">Resonplus</span>
          <Logo class="w-4 h-4 fill-white" />
        </div>
        <div class="hidden lg:flex">
          <h1 class="font-bold text-white text-2xl">{{ props.title }}</h1>
        </div>
        <div class="relative">
          <button
            @click="openSubmenu = !openSubmenu"
            type="button"
            class="flex py-2 pl-7 pr-4 bg- gap-2 rounded-2xl border shadow relative bg-white hover:bg-primary-light group">
            <div
              class="w-9 h-9 rounded-full border-primary-light overflow-hidden absolute -left-3 top-1/2 -translate-y-1/2">
              <img
                src="/images/uv.png"
                alt="avatar"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex items-center gap-1">
              <span class="text-xs group-hover:text-primary">Nombre User</span>
              <ChevronDown class="w-2 h-2" />
            </div>
          </button>
          <div
            class="w-32 h-20 absolute left-1/2 -translate-x-1/2 -bottom-[5.1rem] bg-white rounded-lg shadow-md overflow-hidden"
            v-if="openSubmenu">
            <router-link
              to="/"
              class="inline-block w-full border-b text-center py-2 px-2 hover:bg-primary-light hover:text-primary text-xs text-gray-500 font-bold md:text-sm">
              Cerrar Sesión
            </router-link>
          </div>
        </div>
      </div>
      <div class="w-full h-full overflow-y-auto">
        <slot name="content" />
      </div>
    </div>
    <!-- nav -->
    <nav class="h-14 w-full bg-primary lg:h-full lg:w-[5vw] xl:w-[5.5vw]">
      <div
        class="hidden w-full pb-3 pt-6 lg:flex lg:items-center lg:justify-center">
        <div
          class="bg-white p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl shadow">
          <Logo class="w-7 h-7 fill-primary" />
        </div>
      </div>
      <div class="w-full h-full flex lg:flex-col lg:gap-2">
        <div class="w-full h-full lg:h-20">
          <router-link
            to="/dashboard"
            class="w-full h-full flex items-center justify-center">
            <Home class="w-7 h-7 fill-white" />
          </router-link>
        </div>
        <div class="w-full h-full lg:h-20">
          <a class="w-full h-full flex items-center justify-center">
            <Camara class="w-7 h-7 fill-white" />
          </a>
        </div>
        <div class="w-full h-full lg:h-20">
          <router-link
            to="/users"
            class="w-full h-full flex items-center justify-center">
            <User class="w-7 h-7 fill-white" />
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
