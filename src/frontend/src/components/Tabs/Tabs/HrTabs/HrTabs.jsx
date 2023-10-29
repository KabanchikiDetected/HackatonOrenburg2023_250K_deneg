import React, { useEffect, useState } from "react";
import classes from './HrTabs.module.css'
import { getUserCompany } from '../../../../http';
import { $api } from '../../../../http';


const HrInfoTab = ({ company }) => {
    const [hrs, setHrs] = useState([]);

    const [addHrStatus, setAddHrStatus] = useState("")
    const [hrEmail, setHrEmail] = useState("")
    const [hrPhone, setHrPhone] = useState("")
    const [hrFirstName, setHrFirstName] = useState("")
    const [hrLastName, setHrLastName] = useState("")
    const [hrBirthday, setHrBirthday] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchHrs();
    }, []);

    const fetchHrs = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await $api.get(`company/`, {
                headers: {
                    "Authorization": `Token ${token}`
                }
            });

            const data = response.data.filter((value) => {
                return value.id === company.id
            })

            console.log(data[0].hr)

            setHrs(data[0].hr);
        } catch (error) {
            console.error("Ошибка при получении списка hr", error);
        }
    };

    const stopAddHr = () => {
        setAddHrStatus(false)
    }

    const registerHr = async () => {
        const HrData = {
            email: hrEmail,
            phone: hrPhone,
            first_name: hrFirstName,
            last_name: hrLastName,
            birthday: hrBirthday,
            company: company.id,
            password: "p@ssw0rd",
            role: "hr"
        }

        const token = localStorage.getItem("token")

        try {
            const response = await $api.post(`register/hr/`, HrData, {
                headers: {
                    "Authorization": `Token ${token}`
                }
            });

            stopAddHr()
            fetchHrs()
        }
        catch (error) {
            setErrorMessage("Пользователь с такими данными уже существует")
        }
    }


    return (
        <div>
            <ul>
                {hrs.map((value, index) => {
                    return <li key={index}>{value.first_name} {value.last_name}</li>
                })}
            </ul>

            {
                !addHrStatus ?
                    <button onClick={() => setAddHrStatus(true)}>
                        Добавить Hr
                    </button>
                    :
                    <div>
                        <div className={classes.field}>
                            <label htmlFor="hrEmail">Почта Hr:</label>
                            <input
                                type="text"
                                id="hrEmail"
                                name="hrEmail"
                                value={hrEmail}
                                onChange={(event) => setHrEmail(event.target.value)}
                            />
                        </div>
                        <div className={classes.field}>
                            <label htmlFor="hrFirstName">Имя Hr:</label>
                            <input
                                type="text"
                                id="hrFirstName"
                                name="hrFirstName"
                                value={hrFirstName}
                                onChange={(event) => setHrFirstName(event.target.value)}
                            />
                        </div>
                        <div className={classes.field}>
                            <label htmlFor="hrLastName">Фамилия Hr:</label>
                            <input
                                type="text"
                                id="hrLastName"
                                name="hrLastName"
                                value={hrLastName}
                                onChange={(event) => setHrLastName(event.target.value)}
                            />
                        </div>
                        <div className={classes.field}>
                            <label htmlFor="hrBirthday">Дата рождения Hr:</label>
                            <input
                                type="date"
                                id="hrBirthday"
                                name="hrBirthday"
                                value={hrBirthday}
                                onChange={(event) => setHrBirthday(event.target.value)}
                            />
                        </div>
                        <div className={classes.field}>
                            <label htmlFor="hrPhone">Телефон Hr:</label>
                            <input
                                type="phone"
                                id="hrPhone"
                                name="hrPhone"
                                value={hrPhone}
                                onChange={(event) => setHrPhone(event.target.value)}
                            />
                        </div>
                        <div style={{ fontSize: "14px", color: "red", margin: "10px 0" }}>
                            {errorMessage}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", widows: "100%" }}>
                            <button style={{ marginBottom: "20px" }} onClick={registerHr}>
                                Добавить Hr
                            </button>
                            <button style={{ marginBottom: "20px" }} onClick={stopAddHr}>
                                Отменить добавление
                            </button>
                        </div>
                    </div>
            }
        </div>
    );
};


export default HrInfoTab;
