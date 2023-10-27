import React, { useState, useEffect } from "react";
import classes from "./Footer.module.css";
import logo from "../../assets/logo.svg"
import {NavLink} from 'react-router-dom';


const Footer = () => {

  return (
    <footer className={classes.footer}>
        <div className={classes.navigation}>
            <div className={classes.logo}>
                <img src={logo} alt="LOGO" />
            </div>
            <nav className={classes.headerRight}>
                <NavLink to="/">Возможности</NavLink>
                <NavLink to="/tariffs">Тарифы</NavLink>
                <NavLink to="/introduction">Внедрение</NavLink>
                <NavLink to="/reviews">Отзывы</NavLink>
                <NavLink to="/support">Поддержка</NavLink>
            </nav>
        </div>
        {/* <div>
        <button>📞 Заказать обратный звонок</button>
      <a href="/privacy-policy">🔒 Политика конфиденциальности</a>
      <div>
        <h4>Помощь</h4>
            <ul>
            <li>
                <a href="/faq">🤔 Вопросы и ответы</a>
            </li>
            <li>
                <a href="/training">📚 Обучение</a>
            </li>
            <li>
                <a href="/safety-materials">💼 Материалы по охране труда</a>
            </li>
            </ul>
        </div>
        <form>
            <input type="text" placeholder="Оставить заявку или вопрос" />
            <button type="submit">Отправить</button>
        </form>
      </div> */}
    </footer>
  );
}

export default Footer;
