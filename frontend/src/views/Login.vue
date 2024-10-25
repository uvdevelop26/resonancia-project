<script setup>
import Logo from "@/components/icons/Logo.vue";
import FlashMessage from "@/components/FlashMessage.vue";
import axios from "axios";
import TextInput from "@/components/TextInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Utilities } from "@/js/Utilities";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const errors = ref({});
const message = ref("");

/* funciones */

const close = () => {
  Utilities.close(message);
};

/* Función para iniciar sesión */
const login = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      form.value,
      { withCredentials: true }
    );

    // Almacenar el token en localStorage
    localStorage.setItem("jwt", response.data.token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

    // Capturar el mensaje de éxito
    message.value = response.data.msg;

    router.push("/dashboard");
  } catch (error) {
    if (error.response) {
      message.value = error.response.data.msg;

      const errorObject = error.response.data.errors || [];

      const newErrorObject = {};

      errorObject.forEach((err) => {
        const path = err.path;

        if (!newErrorObject[path]) {
          newErrorObject[path] = [];
        }
        newErrorObject[path].push(err);
      });

      errors.value = newErrorObject;
    }

    console.error("Error en el login:");
  }
};
</script>

<template>
  <div
    class="w-full h-full bg-primary flex items-end relative md:items-center md:justify-center"
  >
    <FlashMessage
      v-if="message"
      type="error"
      :message="message"
      title="Error de Acceso"
      @close="close"
    />
    <div
      class="w-full flex flex-col md:flex-row md:w-auto md:rounded-2xl overflow-hidden md:shadow-2xl"
    >
      <div
        class="h-52 md:h-auto flex items-center justify-center md:w-72 md:flex-1 md:bg-primary-light"
      >
        <div
          class="p-3 bg-white rounded-tl-xl rounded-bl-xl rounded-br-xl md:bg-primary"
        >
          <Logo class="w-12 h-12 fill-primary md:fill-white" />
        </div>
      </div>
      <div
        class="bg-white h-[25rem] pt-8 px-4 rounded-tl-[6rem] flex flex-col items-center md:rounded-tl-none md:flex-1 md:px-6"
      >
        <h1 class="text-2xl font-bold text-primary italic">Login</h1>
        <form @submit.prevent="login" class="flex flex-col pt-4">
          <TextInput
            label="Email"
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            v-model="form.email"
            :error="errors.email"
          />
          <TextInput
            class="mt-2"
            label="Contraseña"
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            v-model="form.password"
            :error="errors.password"
          />
          <div
            class="mt-8 h-10 w-full overflow-hidden rounded-lg bg-primary shadow-md group hover:bg-primary-light"
          >
            <button
              type="submit"
              class="w-full h-full text-white font-bold hover:text-primary"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
