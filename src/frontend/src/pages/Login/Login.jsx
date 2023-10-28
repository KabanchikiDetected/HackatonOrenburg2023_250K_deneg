import React, { useState } from "react";
import classes from "./Login.module.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Создаем объект с данными для отправки на сервер
    const data = {
      email: email,
      password: password,
    };

    try {
      // Отправляем данные на сервер
      const response = await fetch("http://127.0.0.1:8000/api/auth/token/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Проверяем, что токен присутствует в ответе
      if (response.ok && result.auth_token) {
        // Сохраняем токен в localStorage
        localStorage.setItem("token", result.auth_token);
        // Дополнительные действия после успешной авторизации
        // например, перенаправление на другую страницу
      } else {
        // Обрабатываем ошибку авторизации
        console.log("Ошибка авторизации");
      }
    } catch (error) {
      console.log("Ошибка сервера:", error);
    }
  };

  return (
    <form className={classes.loginForm} onSubmit={handleSubmit}>
      <h2>Авторизация</h2>
      <div className={classes.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit">Войти</button>
    </form>
  );
};


export default Login;
