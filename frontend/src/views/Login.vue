<script setup>
import Logo from "@/components/icons/Logo.vue";
import axios from "axios";
import TextInput from "@/components/TextInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const errors = ref({});
const message = ref("");

const getFieldErrorClass = (field) => {
  return errors.value && errors.value[field] ? "border-red-500" : "";
};

// Función para iniciar sesión
const login = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      form.value
    );

    // Almacenar el token en localStorage
    localStorage.setItem("token", response.data.token);

    // Capturar el mensaje de éxito
    message.value = response.data.msg;

    router.push("/dashboard");
  } catch (error) {
    if (error) {
      const errorObject = error.response.data.errors || [];

      const newErrorObject = [];

      errorObject.forEach((err, index) => {
        const path = err.path;

        if(path === err.path){
          
        }

        newErrorObject[index] = { path: path, message: err.message };
        
      });

      errors.value = newErrorObject;

      console.log(errors.value)
    }

    message.value = "";
    console.error("Error en el login:");
  }
};
</script>

<template>
  <div
    class="w-full h-full bg-primary flex items-end relative md:items-center md:justify-center"
  >
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

          <!--  <div v-if="errors" class="text-xs text-red-500 italic">
            <div>{{ errors.email[0] }}</div>
          </div> -->

          <!-- <div v-if="errors" class="text-xs text-red-500 italic">
            <div>{{ errors.password[0] }}</div>
          </div> -->
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
