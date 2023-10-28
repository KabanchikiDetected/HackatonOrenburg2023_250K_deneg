import React, { useState, useEffect } from 'react';
import classes from './UserInfoTab.module.css'

const UserInfoTab = ({ userId }) => {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        phone: ''
    });

    useEffect(() => {
        // Загрузка данных пользователя при монтировании компонента
        fetch(`http://127.0.0.1:8000/api/users/${userId}/`)
            .then(response => response.json())
            .then(data => {
                setUserData({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    birthday: data.birthday || '',
                    phone: data.phone || ''
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Отправка изменений на сервер
        fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data updated successfully');
                    // Можно добавить обработку успешного обновления
                } else {
                    throw new Error('Error updating data');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Можно добавить обработку ошибки
            });
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.field}>
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                />
            </div>
            <div className={classes.field}>
                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                />
            </div>
            <div className={classes.field}>
                <label htmlFor="birthday">Birthday:</label>
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={userData.birthday}
                    onChange={handleChange}
                />
            </div>
            <div className={classes.field}>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className={classes.submitButton}>Save</button>
        </form>
    );
};

export default UserInfoTab;