import {useDebounceFn} from "@vueuse/core";

export function useDebouncer<T extends (...args: any[]) => Promise<any>>(fn: T): T {
    const debounceTime = 500;

    return useDebounceFn(fn, debounceTime) as T;
}