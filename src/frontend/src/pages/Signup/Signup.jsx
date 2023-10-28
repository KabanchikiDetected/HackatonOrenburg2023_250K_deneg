import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import classes from './Signup.module.css';
import { register, login, getUser, createCompany, getUserCompany } from '../../http';

const Signup = ({ setIsAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      birthday,
      username,
      first_name: name,
      last_name: surname,
      phone,
      role: "company_admin"
    };

    const result = await register(userData)

    if (result === 201) {
      login(email, password)
      getUserCompany()
      navigate("/profile")
    }
    else {
      setError("Проверьте введенные данные.")
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
        <input type="date" id="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} pattern="\d{4}-\d{2}-\d{2}" required />
      </div>

      <div className={classes.formGroup}>
        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <p style={{ color: "red", fontSize: "14px" }}>
        {
          error ?
            error
            :
            ""
        }
      </p>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Signup;
