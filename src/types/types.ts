export type UserLogin = {
    username: string,
    password: string,
    verifyPassword: string,
};

export type User = {
    firstname: string,
    lastname: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    verifyPassword: string,
};

export type AuthedUser = {
    id: number | null,
    username: string,
}

export type FavouriteBook = {
    user_id: number,
    book_id: number,
}

export type SuggestedBook = {
    bookName: string
}

export type ErrorType = {
    status: string,
    message: string,
}

export type SearchParams = {
    bookName?: string,
    page?: number,
    authorId?: number,
    genreId?: number,
    publisherId?: number,
    publishDate?: number,
}

export type Books = {
    books: BookType[],
    allPages: number,
    startPage: number,
    lastPage: number,
    page: number,
}

export type ErrorBookResponse = {
    response: string,
    status: number,
    message: string,
    name: string,
}

export type BookType = {
    id: number;
    bookName: string;
    authors: string;
    genres: string;
    publisher: string;
    publicDate: number;
    description: string;
    poster: string;
}

export type AuthedState = {
    isSigned: boolean,
    user: AuthedUser,
}