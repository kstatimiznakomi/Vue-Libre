import {FavouriteBook} from "../types/types";

export function useAddedFavourite(bookId: number, books: FavouriteBook[]) {
    return books.find((item) => {
        return item.id === bookId
    });
}