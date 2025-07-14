import {createApp} from 'vue'
import App from '@/App.vue'
import '@/assets/main.css';
import {routes} from "@/Router/router";
import {createRouter, createWebHistory} from 'vue-router';
import {useCookies} from "vue3-cookies";
import {updateTokens} from "@/composable/useRefreshToken";
import {useCheckAuth} from "@/composable/useCheckAuth";
import {jwtDecode} from "jwt-decode";
import {store} from '@/store/index.ts'
import {AuthedState} from "@/types/types";
import {useAuth} from "./composable/useAuth";

const {cookies} = useCookies();

const router = createRouter({
    history: createWebHistory(),
    routes,
});

async function initAuth() {
    const jwt = cookies.get('accessToken');

    if (!jwt) {
        const authed: AuthedState = await useCheckAuth();
        if (authed.isSigned) {
            const {accessToken} = await updateTokens();
            store.commit('auth/SET_AUTH', {
                isSigned: authed.isSigned,
                user: jwtDecode(accessToken)
            });
        } else {
            store.commit('auth/SET_AUTH', {
                isSigned: authed.isSigned,
                user: {}
            });
        }
    }
}

await initAuth();

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
    .use(router)
    .mount('#app')
