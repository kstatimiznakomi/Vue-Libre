export const PAGES = {
    MAIN: `/`,
    CATALOG: `/catalog`,
    FAVOURITE: `/favourite`,
    LOGIN: `/login`,
    BOOK: `/book/:id`,
    REGISTER: `/register`,
    PROFILE: `/profile`,
    ABOUT: `/about`,
    SEARCH: `/search`,
    NOT_FOUND: `/:pathMatch(.*)*`,
}

const backendPort = import.meta.env.VITE_NEST_BACKEND_PORT;
const backendApi = import.meta.env.VITE_NEST_BACKEND_API;


export const API = {
    BASE_API: `http://localhost:${backendPort}${backendApi}`,
    AUTH_API: `http://localhost:${backendPort}${backendApi}/auth`,
    PATCH_USER_API: `http://localhost:${backendPort}${backendApi}/user/edit`,
    LOGIN_API: `http://localhost:${backendPort}${backendApi}/login`,
    GET_USER_API: `http://localhost:${backendPort}${backendApi}/user`,
    CHECK_AUTH_API: `http://localhost:${backendPort}${backendApi}/checkAuth`,
    FAVOURITE_API: `http://localhost:${backendPort}${backendApi}/user/favourite`,
    FAVOURITE_BOOKS_API: `http://localhost:${backendPort}${backendApi}/user/favourite/u`,
    REGISTER_API: `http://localhost:${backendPort}${backendApi}/register`,
    REFRESH_TOKEN_API: `http://localhost:${backendPort}${backendApi}/refresh`,
    LOGOUT_API: `http://localhost:${backendPort}${backendApi}/logout`,
    CATALOG_API: `http://localhost:${backendPort}${backendApi}/catalog`,
    BOOK_API: `http://localhost:${backendPort}${backendApi}/book`,
    CRITERIA_API: `http://localhost:${backendPort}${backendApi}/criteria`,
    SEARCH_API: `http://localhost:${backendPort}${backendApi}/search?`,
}