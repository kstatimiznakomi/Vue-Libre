import {SearchParams} from "../types/types";
import {LocationQuery} from "vue-router";

export function useSearchParams(selectedCriteria: SearchParams | LocationQuery) {
    const urlParams = new URLSearchParams();
    Object.entries(selectedCriteria).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '' && value !== '0') {
            urlParams.append(key, value.toString());
        }
    })

    return urlParams.toString();
}