import './assets/main.css'
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useUserAuth from '../src/home/composables/useUserAuth'

import App from './App.vue'
import router from './router'


const app = createApp(App)



app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)


app.mount('#app')

const {validateToken } = useUserAuth()

validateToken()