import axios from "axios";
import {API} from "../Router/Pages";

export async function useFavouriteBooks(userId: number) {
    return await axios.get(`${API.FAVOURITE_BOOKS_API}/${userId}`)
        .then((res) => {
            return res.data;
        });
}