import {Module} from 'vuex'
import {jwtDecode} from 'jwt-decode'
import {useCookies} from 'vue3-cookies'
import {updateTokens} from "../composable/useRefreshToken";
import {AuthedState} from "../types/types";
import axios from "axios";
import {API} from "@/Router/Pages";

const cookies = useCookies().cookies

interface AuthState {
    isSigned: boolean,
    user: Record<string, string | number> | null,
}

export const AuthModule: Module<AuthState, any> = {
    namespaced: true,

    state: () => {
        const token = cookies.get('accessToken');

        return {
            isSigned: !!token,
            user: token ? jwtDecode(token) : null,
        }
    },

    mutations: {
        SET_AUTH(state, authedState: AuthedState) {
            state.isSigned = authedState.isSigned
            state.user = authedState.user
        },
    },

    actions: {
        async login({commit}, values) {
            const {accessToken} = await axios.post(
                API.AUTH_API,
                values, {
                    withCredentials: true,
                }
            ).then((res) => {
                return res.data;
            });

            commit('SET_AUTH', {
                isSigned: true,
                user: jwtDecode(accessToken)
            });
        },
        logout({commit}) {
            commit('SET_AUTH', {
                isSigned: false,
                user: {},
            });
            return axios.get(`${API.LOGOUT_API}`, {
                withCredentials: true,
            })
                .then((res) => {
                    return res.data;
                })
        },
        checkAuth({commit}) {
            const token = cookies.get('accessToken')
            if (token) {
                const decoded = jwtDecode(token)
                commit('SET_AUTH', true)
                commit('SET_USER', decoded)
            } else {
                commit('SET_AUTH', false)
                commit('SET_USER', {})
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
}