import axios from "axios";
import {API} from "../Router/Pages";

export async function useSearch(queryParams: string) {
    return await axios.get(`${API.SEARCH_API}${queryParams}`)
        .then((res) => {
            return res.data
        });
}