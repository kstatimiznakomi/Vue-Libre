import {defineStore} from "pinia";
import {jwtDecode} from "jwt-decode";
import {useCookies} from "vue3-cookies";
import axios from "axios";
import {updateTokens} from "../composable/useRefreshToken";
import {API} from "../Router/Pages";
import {AuthedState, AuthedUser, User, UserLogin} from "../types/types";

const cookies = useCookies().cookies

interface AuthState {
    isSigned: boolean;
    user: AuthedUser;
}

export const useAuthPinia = defineStore('authPinia', {
    state: (): AuthState => ({
        isSigned: false,
        user: {
            id: null,
            username: ''
        } as AuthedUser
    }),

    persist: true,

    actions: {
        setAuth(values: AuthedState) {
            this.isSigned = values.isSigned;
            this.user = values.user;
        },
        async login(values: UserLogin) {
            try {
                const {accessToken} = await axios.post(
                    API.AUTH_API,
                    values, {
                        withCredentials: true,
                    }
                ).then((res) => {
                    return res.data;
                });

                this.isSigned = true
                this.user = jwtDecode(accessToken)
            } catch (e) {
                console.error("Login failed:", e);
                throw e;
            }
        },
        async patch(values: User) {
            try {
                return await axios.patch(API.PATCH_USER_API, values);
            } catch (e) {
                console.error('Не удалось обновить пользователя', e);
            }
        },
        async logout() {
            try {
                await axios.get(API.LOGOUT_API, {withCredentials: true});
            } catch (error) {
                console.error('Logout request failed', error);
            } finally {
                this.isSigned = false;
                this.user = {id: null, username: ''};
            }
        },

        async refreshTokens() {
            return await updateTokens();
        }
    },
    getters: {
        authInfo: (state) => ({
            isSigned: state.isSigned,
            user: state.user
        }),
    },
})