import axios from "axios";
import {API} from "../Router/Pages";

export async function useFavouriteBooks(userId: number, searchParams: string) {

    return await axios.get(`${API.FAVOURITE_BOOKS_API}/${userId}${searchParams ? `?${searchParams}` : ''}`)
        .then((res) => {
            return res.data;
        });
}