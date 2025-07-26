import {computed} from 'vue'
import {User, UserLogin} from "../types/types";
import {useAuthPinia} from "../store/storeAuthPinia";

export function useAuth() {
    const storePinia = useAuthPinia();

    const login = async (values: UserLogin) => {
        return storePinia.login(values)
    };

    const logout = async () => {
        await storePinia.logout();
    };

    const patch = async (values: User) => {
        await storePinia.patch(values);
    }

    const user = computed(() => storePinia.user);
    const isSigned = computed(() => storePinia.isSigned);

    return {
        user,
        isSigned,
        login,
        logout,
        patch
    };
}