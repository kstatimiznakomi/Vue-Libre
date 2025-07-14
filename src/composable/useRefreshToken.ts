import axios from "axios";
import {API} from "@/Router/Pages";

export async function updateTokens() {
    return await axios.get(API.REFRESH_TOKEN_API, {
        withCredentials: true,
    })
        .then((res) => {
            return res.data;
        });
}