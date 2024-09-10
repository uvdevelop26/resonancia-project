<script setup>
import Logo from "@/components/icons/Logo.vue";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";



const email = ref(null);
const password = ref(null);
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token);
    // Redirigir a la página principal después de iniciar sesión
    router.push("/dashboard");
  } catch (error) {
    console.error("Error en el login:", error);
  }
};
</script>

<template>
  <div
    class="w-full h-full bg-primary flex items-end md:items-center md:justify-center">
    <div
      class="w-full flex flex-col md:flex-row md:w-auto md:rounded-2xl overflow-hidden md:shadow-2xl">
      <div
        class="h-52 md:h-auto flex items-center justify-center md:w-72 md:flex-1 md:bg-primary-light">
        <div
          class="p-3 bg-white rounded-tl-xl rounded-bl-xl rounded-br-xl md:bg-primary">
          <Logo class="w-12 h-12 fill-primary md:fill-white" />
        </div>
      </div>
      <div
        class="bg-white h-[25rem] pt-8 px-4 rounded-tl-[6rem] flex flex-col items-center md:rounded-tl-none md:flex-1 md:px-6">
        <h1 class="text-2xl font-bold text-primary">Login</h1>
        <form @submit.prevent="login" class="flex flex-col gap-4 pt-4">
          <div class="flex flex-col gap-2">
            <label for="email" class="font-bold">Correo:</label>
            <input
              type="email"
              class="h-8 w-72 px-2 text-sm text-primary bg-gray-100 border-b-2 rounded md:w-[17rem]"
              v-model="email"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="email" class="font-bold">Contraseña:</label>
            <input
              type="password"
              class="h-8 w-72 px-2 text-sm text-primary bg-gray-100 border-b-2 rounded md:w-[17rem]"
              v-model="password"
            />
          </div>
          <div class="mt-8 h-10 w-full overflow-hidden rounded-lg bg-primary">
            <button type="submit" class="w-full h-full text-white font-bold">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
