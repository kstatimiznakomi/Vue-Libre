import axios from "axios";
import {API} from "../Router/Pages";

export async function useGetUser(id: number) {
    return await axios.get(`${API.GET_USER_API}/${id}`)
        .then((res) => {
            return res.data;
        });
}