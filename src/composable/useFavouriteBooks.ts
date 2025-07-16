import axios from "axios";
import {API} from "../Router/Pages";
import {useRoute} from "vue-router";
import {useSearchParams} from "./useSearchParams";

export async function useFavouriteBooks(userId: number) {
    const route = useRoute();

    function changePageQuery(page: number) {
        if (Object.keys(route.query).length)
            return `${useSearchParams({
                query: {
                    ...route.query,
                    page: page.toString(),
                },
            }.query)}`;
        return useSearchParams(route.query);
    }

    function changePageParams(page: number) {
        if (Object.keys(route.params).length)
            return {
                params: {
                    ...route.params,
                    page: page.toString(),
                },
            }.params.page;
        return useSearchParams(route.params);
    }

    console.log(changePageParams(Number(route.params.page)), changePageQuery(Number(route.query.page)));

    return await axios.get(`${API.FAVOURITE_BOOKS_API}/${userId}/${changePageParams(Number(route.params.page))}${changePageQuery(Number(route.query.page))}`)
        .then((res) => {
            return res.data;
        });
}