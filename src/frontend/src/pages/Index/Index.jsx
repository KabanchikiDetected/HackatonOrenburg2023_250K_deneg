import React from 'react';
import classes from './Index.module.css'

import { NavLink } from 'react-router-dom'; 

const Index = (props) => {
    return (
    <div className={classes.container}>
        <div>
            <h2>Платформы для обучения и тестирования сотрудников</h2>
            <p>
            Единая платформа для обучения и тестирования сотрудников рабочих профессий
            с использованием как стандартных, так и VR-инструментов, симулирующих
            реальные ситуации в рамках конкретного предприятия.
            </p>
            <p>
            Разработанная платформа представляет собой веб-приложение, на котором
            предприятие может самостоятельно создать свой портал/школу, наполнить его 
            необходимым контентом и запустить обучение и тестирование сотрудников.
            </p>
        </div>
        <div>
            <h3>Функциональные возможности платформы:</h3>
            <ul>
            <li>Создание портала/школы для предприятия</li>
            <li>Загрузка отделов и сотрудников</li>
            <li>Загрузка обучающих материалов</li>
            <li>Запуск тестирования для всех или определенных групп сотрудников</li>
            <li>Интеграция с BMP-файлами для отображения результатов VR-тестов</li>
            </ul>
        </div>
        <div>
            <h3>Преимущества нашей платформы:</h3>
            <ul>
            <li>Использование VR-инструментов для симуляции реальных ситуаций</li>
            <li>Возможность создания собственного портала/школы для каждого предприятия</li>
            <li>Гибкость настройки контента и тестирований для разных групп сотрудников</li>
            <li>Интеграция с BMP-файлами для записи и отображения результатов VR-тестов</li>
            </ul>
        </div>
        <div>
            <h3>Начни бесплатно уже сейчас!</h3>
            <p>Зарегистрируйте новый портал и начните использовать нашу платформу для обучения и тестирования сотрудников.</p>
            <div className={classes.centerButton}>
                <NavLink to="signup"><button>Зарегистрироваться</button></NavLink>
            </div>
        </div>
    </div>
    );
}
 
export default Index;