import {createApp} from 'vue'
import App from '@/App.vue'
import '@/assets/main.css';
import {routes} from "@/Router/router";
import {createRouter, createWebHistory} from 'vue-router';
import {useCookies} from "vue3-cookies";
import {store} from './store'
import {useAuth} from "./composable/useAuth";
import {AuthedState} from "./types/types";
import {useCheckAuth} from "./composable/useCheckAuth";
import {updateTokens} from "./composable/useRefreshToken";
import {jwtDecode} from "jwt-decode";
import {createPinia} from "pinia";
import {useAuthPinia} from "./store/storeAuthPinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const {cookies} = useCookies();

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const pinia = createPinia();

async function checkAndSetAuth() {
    const authStorePinia = useAuthPinia();
    const authed: AuthedState = await useCheckAuth();

    if (authed.isSigned) {
        const {accessToken} = await updateTokens();

        authStorePinia.setAuth({
            isSigned: authed.isSigned,
            user: jwtDecode(accessToken),
        })

    } else {
        authStorePinia.setAuth({
            isSigned: authed.isSigned,
            user: {
                id: null,
                username: '',
            },
        })
    }
}

async function initAuth() {
    const jwt = cookies.get('accessToken');

    if (!jwt) {
        await checkAndSetAuth();
    }
}


router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;
    const unsignedOnly = to.meta.unsignedOnly;
    const {isSigned} = useAuth();
    
    if (requiresAuth && !isSigned.value) {
        next({path: '/login'});
    }

    if (unsignedOnly && isSigned.value) {
        next({path: '/'});
    }

    next();
})

createApp(App)
    .use(store)
    .use(pinia)
    .use(router)
    .mount('#app');

pinia.use(piniaPluginPersistedstate);

await initAuth();
