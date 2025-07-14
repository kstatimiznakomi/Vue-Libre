import {object, string, TypeOf} from "zod";

export const registerUserSchema = object({
    firstname: string({required_error: "Заполните имя"})
        .min(1, "Заполните имя")
        .max(30, "Максимальная длина имени 30"),
    username: string({required_error: "Заполните имя пользователя"})
        .min(1, "Заполните имя пользователя")
        .max(30, "Максимальная длина имени пользователя 30"),
    lastname: string({required_error: "Заполните фамилию"})
        .min(1, "Заполните фамилию")
        .max(30, "Максимальная фамилии имени 30"),
    surname: string({required_error: "Заполните отчество"})
        .min(1, "Заполните отчество")
        .max(30, "Максимальная фамилии имени 30")
        .optional(),
    email: string({required_error: "Требуется почта"})
        .min(1, "Заполните почту")
        .email("Неверный формат почты"),
    phone: string({required_error: "Введите номер телефона"})
        .min(11, "Заполните номер телефона полностью")
        .refine((phone) => phone.startsWith('8') || phone.startsWith('+7'), {
            path: ["invalidPhone"],
            message: "Номер телефона в некорректном формате",
        }),
    password: string({required_error: "Заполните пароль"})
        .min(4, "Минимальная длина пароля 4")
        .max(30, "Максимальная длина пароля 30"),
    verifyPassword: string({
        required_error: "Введите подтверждение пароля",
    })
        .min(4, "Минимальная длина пароля 4")
        .max(30, "Максимальная длина пароля 30"),
}).refine((data) => data.password === data.verifyPassword, {
    path: ["verifyPassword"],
    message: "Пароли не совпадают!",
});

export const loginUserSchema = object({
    username: string({required_error: "Username is required"})
        .min(3, "Минимальная длина имени пользователя 3")
        .max(30),
    password: string({required_error: "Password is required"})
        .min(4, "Минимальная длина пароля 4")
        .max(30),
    email: string({required_error: "Password is required"})
        .min(3, "Почта не заполнена")
        .max(30)
        .optional(),
    verifyPassword: string({
        required_error: "Подтвердите пароль",
    })
        .min(4, "Минимальная длина подтверждения пароля 4")
        .max(30, "Максимальная длина пароля 30"),
}).refine((data) => data.password === data.verifyPassword, {
    path: ["verifyPassword"],
    message: "Пароли не совпадают!",
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateUserInput = TypeOf<typeof registerUserSchema>;
