import {SearchParams} from "../types/types";

export function useSearchParams(selectedCriteria: SearchParams) {
    const urlParams = new URLSearchParams();
    Object.entries(selectedCriteria).forEach((criteria) => {
        if (criteria[1] !== '' && criteria[1] !== '0') urlParams.set(criteria[0], criteria[1]);
        else urlParams.delete(criteria[0]);
    });

    return decodeURIComponent(urlParams.toString());
}