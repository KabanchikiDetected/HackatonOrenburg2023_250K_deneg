import React, { useState, useEffect } from 'react';
import classes from './UserInfoTab.module.css'
import { getUser, updateUser } from '../../../../http';

const UserInfoTab = () => {
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        phone: ''
    });

    useEffect(() => {
        const func = async () => {
            const user = await getUser()

            console.log(user)

            setUser(user)

            setUserData({
                first_name: user.first_name,
                last_name: user.last_name,
                birthday: user.birthday,
                phone: user.phone
            })
        }
        func()
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        updateUser(userData)
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.field}>
                <label htmlFor="birthday">Почта:</label>
                <p>{user.email}</p>
            </div>
            <div className={classes.field}>
                <label htmlFor="first_name">Имя:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                />
            </div>
            <div className={classes.field}>
                <label htmlFor="last_name">Фамилия: </label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                />
            </div>
            <div className={classes.field}>
                <label htmlFor="birthday">День рождения:</label>
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={userData.birthday}
                    onChange={handleChange}
                />
            </div>
            <div className={classes.field}>
                <label htmlFor="phone">Номер телефона:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className={classes.submitButton}>Обновить</button>
        </form>
    );
};

export default UserInfoTab;