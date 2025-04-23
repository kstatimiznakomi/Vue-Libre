import {createApp} from 'vue'
import App from './App.vue'
import './assets/main.css';
import {routes} from "@/Router/router";
import {createRouter, createWebHistory} from 'vue-router';
import axios from "axios";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const checkAuth = () => {
    axios.get(`http://localhost:${import.meta.env.VITE_NEST_BACKEND_PORT}${import.meta.env.VITE_NEST_BACKEND_API}/auth/check`, {
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
}

createApp(App)
    .use(router)
    .mount('#app')
