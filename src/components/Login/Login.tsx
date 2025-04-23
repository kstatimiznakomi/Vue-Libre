import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import axios from "axios";
import {backendPort, expressBaseApi} from "../constants/constants";

const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const sendUser = async (data: FieldValues) => {
        try {
            console.log(data)
            if (data.username === '' || data.password === '') {
                console.log('Заполните имя пользователя и пароль')
                return
            }
            await axios.post('http://localhost:' + backendPort + expressBaseApi + '/login', user)
                .then((data) => {
                    localStorage.setItem('token', data.data.token)
                })
            navigate('/catalog/1')


        } catch (er) {
            console.log(er)
        }
    }

    return (

        <div className="reg-bg">
            <div className="grad-bg">
                <div className="welcome">Войти</div>
                <div id="form">
                    <form onSubmit={handleSubmit((data) => sendUser(data))}>
                        <input {...register('username')} type="text"
                               className="user"
                               name="username"
                               placeholder="Имя пользователя" required/>
                        {errors.username && <p>Имя пользователя обязательное поле</p>}
                        <input {...register('password')} type="password"
                               className="user"
                               name="password" placeholder="Пароль" required/>
                        {errors.password && <p>Пароль обязательное поле</p>}
                        {/*<button onClick={() => sendUser()} className={'login_btn'} type="submit">Войти</button>*/}
                        <button disabled={!!errors.username || !!errors.password} className={'login_btn'}
                                type="submit">Войти
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;