import {defineStore} from "pinia";
import {ref} from "vue";

export const useToastStore = defineStore('toast', () => {
    const message = ref('');
    const visible = ref(false);

    function showToast(msg: string, duration = 2000) {
        message.value = msg;
        visible.value = true;

        setTimeout(() => {
            visible.value = false;
        }, duration);
    }

    return {message, visible, showToast};
});