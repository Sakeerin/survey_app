<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
    
        
        <form class="space-y-6" @submit="login">
            <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                {{ errorMsg }}
                <span @click="errorMsg = ''" class="w-8 h-8 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </span>
            </div>
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900 text-left">Email address</label>
                <div class="mt-2">
                <input id="email" name="email" type="email" autocomplete="email" required v-model="user.email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
    
            <div>
                <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div class="mt-2">
                <input id="password" name="password" type="password" autocomplete="current-password" required v-model="user.password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    v-model="user.remember"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                    Remember me
                    </label>
                </div>
            </div>
                
            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            {{ ' ' }}
            <router-link :to="{name: 'Register'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register for free</router-link>
        </p>
    </div>
  </template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const user = {
  email: "",
  password: "",
  remember: false
};

// let loading = ref(false);
let errorMsg = ref("");

function login(ev) {
  ev.preventDefault();

//   loading.value = true;
  store
    .dispatch("login", user)
    .then(() => {
    //   loading.value = false;
      router.push({
        name: "Dashboard",
      });
    })
    .catch((err) => {
    //   loading.value = false;
      errorMsg.value = err.response.data.error;
    });
}
</script>
  