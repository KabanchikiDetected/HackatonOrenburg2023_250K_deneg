import React, { useEffect, useState } from "react";
import classes from './DepartmentTab.module.css'
import { getUserCompany } from '../../../../http';
import { $api } from '../../../../http';


const DepartmentInfoTab = () => {
    const [companyName, setCompanyName] = useState("")
    const [companyDescription, setCompanyDescription] = useState("")
    const [companyDate, setCompanyDate] = useState("")
    const [companyLogo, setCompanyLogo] = useState("")

    useEffect(() => {
        const func = async () => {
            const company = await getUserCompany()
            setCompanyLogo(company.image)
            setCompanyName(company.title)
            setCompanyDescription(company.description)
            setCompanyDate(company.created.split("T")[0].replace("-", "/"))
        }
        func()
    }, [])

    return (
        <div className={classes.companyTab}>
            <img src={companyLogo} alt="Company Logo" className={classes.logo} />
            <h1 className={classes.name}>{companyName}</h1>
            <p className={classes.description}>
                {companyDescription}
            </p>
            <p className={classes.joinDate}>Дата присоединения: {companyDate}</p>
        </div>
    );
};


const DepartmentsList = () => {
    const [departments, setDepartments] = useState([]);
    const [editDepartment, setEditDeparment] = useState(false)
    const [currentDepartment, setCurrentDepartment] = useState({})

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await $api.get("department/", {
                headers: {
                    "Authorization": `Token ${token}`
                }
            });

            console.log(response.data)
            setDepartments(response.data);
        } catch (error) {
            console.error("Ошибка при получении списка отделов", error);
        }
    };

    const handleEditClick = (departmentId) => {
        setCurrentDepartment(departmentId)
        setEditDeparment(true)
    };

    const handleSaveClick = async (departmentId, updatedDepartment) => {
        try {
            const response = await $api.put(
                `department/${departmentId}/`,
                updatedDepartment
            );
            console.log("Данные отдела успешно обновлены", response.data);
            // Дополнительные действия после успешного сохранения
        } catch (error) {
            console.error("Ошибка при сохранении данных отдела", error);
        }
    };

    const handleDeleteEmployee = async (departmentId, employeeId) => {
        //     try {
        //         const response = await $api.delete(
        //             `department/${departmentId}/employees/${employeeId}`
        //         );
        //         console.log("Сотрудник успешно удалён", response.data);
        //         // Дополнительные действия после успешного удаления сотрудника
        //     } catch (error) {
        //         console.error("Ошибка при удалении сотрудника", error);
        //     }
    };

    const handleAddEmployee = async (departmentId, newEmployee) => {
        try {
            const response = await $api.post(
                `url-сервера/api/departments/${departmentId}/employees`,
                newEmployee
            );
            console.log("Новый сотрудник успешно добавлен", response.data);
            // Дополнительные действия после успешного добавления сотрудника
        } catch (error) {
            console.error("Ошибка при добавлении сотрудника", error);
        }
    };

    return (
        <div>
            {departments.map((department) => (
                <div key={department.id}>
                    <div className={classes.departmentItem}>
                        {
                            currentDepartment == department.id && editDepartment
                                ?
                                <></>
                                :
                                <div className={classes.departmentMain}>
                                    <h4>{department.title}</h4>
                                    <button onClick={() => handleEditClick(department.id)}>Редактировать</button>
                                </div>
                            }
                    </div>

                    {/* Список сотрудников */}
                    {/* <ul> */}
                    {/* {department.employees.map((employee) => (
                            <li key={employee.id}>
                                {employee.first_name} {employee.last_name}
                                <button
                                    onClick={() => handleDeleteEmployee(department.id, employee.id)}
                                >
                                    Удалить
                                </button>
                            </li>
                        ))} */}
                    {/* </ul> */}

                    {/* Форма добавления сотрудника */}
                    {/* <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const email = e.target.elements.email.value;
                            const firstName = e.target.elements.firstName.value;
                            const lastName = e.target.elements.lastName.value;
                            handleAddEmployee(department.id, { email, first_name: firstName, last_name: lastName });
                        }}
                    >
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="text" name="firstName" placeholder="Имя" required />
                        <input type="text" name="lastName" placeholder="Фамилия" required />
                        <button type="submit">Добавить сотрудника</button>
                    </form> */}

                    {/* Кнопка сохранения изменений */}
                    {/* Предполагается, что поля для редактирования уже реализованы */}
                    {/* <button onClick={() => handleSaveClick(department.id, updatedDepartment)}>
                        Сохранить изменения
                    </button> */}
                </div>
            ))}
        </div>
    );
};


export { DepartmentInfoTab, DepartmentsList };
