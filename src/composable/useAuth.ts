import {computed} from 'vue'
import {useStore} from 'vuex'
import {UserLogin} from "../types/types";

export function useAuth() {
    const store = useStore();

    const login = async (values: UserLogin) => {
        return await store.dispatch('auth/login', values);
    };

    const logout = async () => {
        await store.dispatch('auth/logout');
    };


    const user = computed(() => store.state.auth.user);
    const isSigned = computed(() => store.state.auth.isSigned);


    return {
        user,
        isSigned,
        login,
        logout,
    };
}