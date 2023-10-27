import React, { useState, useEffect } from "react";
import classes from "./Header.module.css";
import logo from "../../assets/logo.svg"
import {NavLink} from 'react-router-dom';


const Header = () => {

  return (
    <header className={classes.header}>
        <div className={classes.logo}>
            <img src={logo} alt="LOGO" />
        </div>
        <nav className={classes.headerRight}>
            <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/">Возможности</NavLink>
            <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/tariffs">Тарифы</NavLink>
            <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/introduction">Внедрение</NavLink>
            <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/reviews">Отзывы</NavLink>
            <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/support">Поддержка</NavLink>
        </nav>
        <div className={classes.auth}>
            <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/login">Войти</NavLink>
            <NavLink className={({ isActive }) => (isActive ? classes.active : '')} to="/signup">Зарегистрироваться</NavLink>
        </div>
    </header>
  );
}

export default Header;
