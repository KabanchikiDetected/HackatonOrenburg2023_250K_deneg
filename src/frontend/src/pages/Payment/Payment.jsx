import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import styles from "./Payment.module.css";


const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const tariffName = queryParams.get("name");
  const tariffPrice = queryParams.get("price");

  const payTariff = () => {
    alert(tariffPrice)
  }

  return (
    <div>
        <h1 className={styles.paymentPageHeading}>Оплата тарифа</h1>
        <div className={styles.paymentPageContainer}>
        <h2 className={styles.paymentPageSubheading}>Детали тарифа:</h2>
        <p className={styles.tariffDetails}>Название: {tariffName}</p>
        <p className={styles.tariffDetails}>Цена: {tariffPrice}$</p>
        <button onClick={payTariff}>Оплатить</button>
        </div>
        <NavLink to="/tariffs"><button>Вернуться назад</button></NavLink>
    </div>
  );
};


export default Payment;