export type UserLogin = Pick<User, 'username' | 'password' | 'verifyPassword'>;

export type User = {
    firstname: string,
    lastname: string,
    surname: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    verifyPassword: string,
};

export const fieldMap = {
    'Имя': 'firstname',
    'Фамилия': 'lastname',
    'Отчество': 'surname',
    'Имя пользователя': 'username',
    'Почта': 'email',
    'Телефон': 'phone',
    'Пароль': 'password',
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