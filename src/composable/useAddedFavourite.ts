import {BookType} from "../types/types";

export function useAddedFavourite(bookId: number, books: BookType[]) {
    return books.find((item) => {
        return item.id === bookId
    });
}