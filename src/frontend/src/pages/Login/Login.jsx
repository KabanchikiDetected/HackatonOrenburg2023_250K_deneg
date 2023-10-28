import React, { useState, useContext, useEffect } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../http";
import { getUser } from "../../http";


const Login = ({setIsAuth}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await login(email, password)

        console.log(result)

        if (result === 200) {
            setIsAuth(true)
            navigate("/profile")
        }
        else {
            setIsAuth(false)
            setPassword("")
            setErrorMessage("Ошибка входа. Проверьте данные")
        }
    };

    useEffect(() => {
        const func = async () => {
            const user = await getUser()

            if (Object.keys(user).length !== 0) {
                navigate("/profile")
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }
        }
        func()
    }, [])

    return (
        <form className={classes.loginForm} onSubmit={handleSubmit}>
            <h2>Авторизация</h2>
            <div className={classes.formGroup}>
                <label htmlFor="email">Почта:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => { setEmail(event.target.value); setErrorMessage("")}}
                    required
                />
            </div>
            <div className={classes.formGroup}>
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value); setErrorMessage("")}}
                    required
                />
            </div>
            <p style={{color: "red", fontSize: "14px"}}>
            {
                errorMessage ?
                errorMessage
                :
                ""
            }
            </p>
            <button type="submit">Войти</button>
        </form>
    );
};


export default Login;
