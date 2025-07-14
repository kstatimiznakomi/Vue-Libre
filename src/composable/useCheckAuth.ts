import axios from "axios";
import {API} from "../Router/Pages";

export async function useCheckAuth() {
    return await axios.get(`${API.CHECK_AUTH_API}`, {
        withCredentials: true,
    })
        .then((res) => {
            return res.data;
        });
}