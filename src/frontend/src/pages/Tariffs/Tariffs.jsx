import React, { useState } from 'react';
import classes from './Tariffs.module.css'
import { useNavigate } from "react-router-dom";

const Tariffs = () => {
    const [selectedTariff, setSelectedTariff] = useState(null);
    const navigate = useNavigate();

    const handleTariffSelect = (tariff) => {
        setSelectedTariff(tariff);
    };

    const paymentTariff = (tariffName, tariffPrice) => {
        navigate({
            pathname: "/payment",
            search: `?name=${tariffName}&price=${tariffPrice}`
        })
    }

    return (
    <div className={classes.container}>
        <h2>Тарифы</h2>
        <div className={classes.tariffOptions}>
            <div
            className={`${classes.tariffOption} ${
                selectedTariff === 'free' ? classes.selected : ''
            }`}
            onClick={() => handleTariffSelect('Бесплатный')}
            >
            <h3>Бесплатный</h3>
            <p>Фиксированная цена: $0</p>
            {/* <button>Быстрая покупка</button> */}
            </div>
            <div
            className={`${classes.tariffOption} ${
                selectedTariff === 'smallBusiness' ? classes.selected : ''
            }`}
            onClick={() => handleTariffSelect('Малый бизнес')}
            >
            <h3>Малый бизнес</h3>
            <p>Фиксированная цена: $99</p>
            <button onClick={() => {paymentTariff("Малый бизнес", 99)}}>Быстрая покупка</button>
            </div>
            <div
            className={`${classes.tariffOption} ${
                selectedTariff === 'enterprise' ? classes.selected : ''
            }`}
            onClick={() => handleTariffSelect('Предприятие')}
            >
            <h3>Предприятие</h3>
            <p>Фиксированная цена: $299</p>
            <button onClick={() => {paymentTariff("Предприятие", 299)}}>Быстрая покупка</button>
            </div>
            <div
            className={`${classes.tariffOption} ${
                selectedTariff === 'corporation' ? classes.selected : ''
            }`}
            onClick={() => handleTariffSelect('Корпорация')}
            >
            <h3>Корпорация</h3>
            <p>Фиксированная цена: $999</p>
            <button onClick={() => {paymentTariff("Корпорация", 999)}}>Быстрая покупка</button>
            </div>
        </div>
        {selectedTariff && (
            <div className={classes.tariffDetails}>
            <h3>Подробное описание тарифа "{selectedTariff}"</h3>
            <p>Здесь выводится подробное описание выбранного тарифа.</p>
            </div>
        )}
    </div>
    );
}

 
export default Tariffs;