import React, { useState } from 'react';
import classes from './Signup.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      email,
      password,
      birthday,
      username,
      name,
      surname,
      phone
    };

    fetch('http://127.0.0.1:8000/api/auth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      // Обработка ответа от сервера
      console.log(data);
    })
    .catch(error => {
      // Обработка ошибки
      console.error(error);
    });
  };

  return (
    <form className={classes.registrationForm} onSubmit={handleSubmit}>
      <h2>Регистрация</h2>

      <div className={classes.formGroup}>
        <label htmlFor="username">Логин:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="email">Почта:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="phone">Номер телефона:</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="name">Имя:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="surname">Фамилия:</label>
        <input type="text" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="birthday">День рождения:</label>
        <input type="text" id="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} pattern="\d{4}-\d{2}-\d{2}" required />
        <small>Формат: YYYY-MM-DD</small>
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Signup;
