import BooksPage from "@/Layouts/BooksPage.vue";
import BasePage from "@/Layouts/BasePage.vue";
import About from "@/Pages/About/About.vue";
import Login from "@/components/Login/Login.vue";

export const routes = [
    {
        path: '/',
        component: BasePage,

    },
    {
        path: '/catalog/:page',
        component: BooksPage,
    },
    {
        path: '/catalog',
        component: BooksPage,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/search',
        component: BooksPage,
    },
];
