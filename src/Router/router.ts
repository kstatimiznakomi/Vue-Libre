import About from "@/Pages/About/About.vue";
import Login from "@/components/Login/Login.vue";
import BaseLayout from "@/Layouts/BaseLayout.vue";
import Register from "@/Pages/Register/Register.vue";
import NotFoundPage from "@/components/NotFound/NotFoundPage.vue";
import Main from "@/Pages/Main/HomePage.vue";
import BookPage from "@/Pages/Book/BookPage.vue";
import Profile from "@/Pages/Profile/Profile.vue";
import {PAGES} from "@/Router/Pages";
import BooksPage from '@/Pages/Catalog/BooksPage.vue';
import Favourite from '@/Pages/Favourite/Favourite.vue';

export const routes = [
    {
        path: '/',
        component: BaseLayout,
        children: [
            {
                path: PAGES.MAIN,
                component: Main,
                meta: {requiresAuth: false},
            },
            {
                path: PAGES.CATALOG,
                component: BooksPage,
                meta: {requiresAuth: false},
                redirect: `${PAGES.CATALOG}/1`,
            },
            {
                path: `${PAGES.CATALOG}/:page`,
                component: BooksPage,
                meta: {requiresAuth: false},
            },
            {
                path: `${PAGES.FAVOURITE}`,
                component: Favourite,
                meta: {requiresAuth: false},
            },
            {
                path: `${PAGES.FAVOURITE}/:page(\\d+)`,
                redirect: {
                    path: `${PAGES.FAVOURITE}`,
                    query: {page: '1'}
                },
            },
            {
                path: `${PAGES.FAVOURITE}`,
                redirect: {
                    path: `${PAGES.FAVOURITE}`,
                    query: {page: '1'}
                },
            },
            {
                path: PAGES.ABOUT,
                component: About,
                meta: {requiresAuth: false},
            },
            {
                path: PAGES.BOOK,
                component: BookPage,
                meta: {requiresAuth: false},
            },
            {
                path: PAGES.SEARCH,
                component: BooksPage,
                meta: {requiresAuth: false},
            },
            {
                path: PAGES.PROFILE,
                component: Profile,
                meta: {requiresAuth: true},
            }
        ]

    },
    {
        path: PAGES.NOT_FOUND,
        component: NotFoundPage,
        meta: {requiresAuth: false},
    },
    {
        path: PAGES.LOGIN,
        component: Login,
        meta: {unsignedOnly: true},
    },
    {
        path: PAGES.REGISTER,
        component: Register,
        meta: {unsignedOnly: true},
    },
];
