import {ref} from "vue";

export const urlParts = ref(document.URL.split('/'));
export const currentPage = Number(urlParts[urlParts.value.length - 1]) ? urlParts[urlParts.value.length - 1] : 1;