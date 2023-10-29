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


const DepartmentsList = ({ company }) => {
    const [departments, setDepartments] = useState([]);
    const [editDepartment, setEditDeparment] = useState(false)
    const [currentDepartment, setCurrentDepartment] = useState({})

    const [addDepartment, setAddDepartment] = useState(false)
    const [newDepartmentName, setNewDepartmentName] = useState("")

    const [addEmployee, setAddEmployee] = useState(false)
    const [addEmployeeDepartment, setAddEmployeeDepartment] = useState({})

    const [employeeEmail, setEmployeeEmail] = useState("")
    const [employeeFirstName, setEmployeeFirstName] = useState("")
    const [employeeLastName, setEmployeeLastName] = useState("")
    const [employeeBirthday, setEmployeeBirthday] = useState("")
    const [employeePhone, setEmployeePhone] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await $api.get(`department/?company=${company.id}`, {
                headers: {
                    "Authorization": `Token ${token}`
                }
            });

            const data = response.data.sort((a, b) => {
                return a.id - b.id || a.title.localeCompare(b.title);
            });

            setDepartments(data);
        } catch (error) {
            console.error("Ошибка при получении списка отделов", error);
        }
    };

    const handleEditClick = (department) => {
        setCurrentDepartment(department)
        setEditDeparment(true)
    };

    // const handleSaveClick = async (departmentId, updatedDepartment) => {
    //     try {
    //         const response = await $api.put(
    //             `department/${departmentId}/`,
    //             updatedDepartment
    //         );
    //         console.log("Данные отдела успешно обновлены", response.data);
    //         // Дополнительные действия после успешного сохранения
    //     } catch (error) {
    //         console.error("Ошибка при сохранении данных отдела", error);
    //     }
    // };

    // const handleDeleteEmployee = async (departmentId, employeeId) => {
    //     //     try {
    //     //         const response = await $api.delete(
    //     //             `department/${departmentId}/employees/${employeeId}`
    //     //         );
    //     //         console.log("Сотрудник успешно удалён", response.data);
    //     //         // Дополнительные действия после успешного удаления сотрудника
    //     //     } catch (error) {
    //     //         console.error("Ошибка при удалении сотрудника", error);
    //     //     }
    // };

    // const handleAddEmployee = async (departmentId, newEmployee) => {
    //     try {
    //         const response = await $api.post(
    //             `url-сервера/api/departments/${departmentId}/employees`,
    //             newEmployee
    //         );
    //         console.log("Новый сотрудник успешно добавлен", response.data);
    //         // Дополнительные действия после успешного добавления сотрудника
    //     } catch (error) {
    //         console.error("Ошибка при добавлении сотрудника", error);
    //     }
    // };

    const addNewDepartment = async () => {
        const departmentName = newDepartmentName

        setNewDepartmentName("")
        setAddDepartment(false)

        const token = localStorage.getItem("token")

        $api.post("department/", {
            company: company.id,
            title: departmentName
        }, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })

        fetchDepartments()
    }

    const updateDepartment = async () => {
        const token = localStorage.getItem("token")

        const response = await $api.put(`department/${currentDepartment.id}/`, {
            company: company.id,
            title: currentDepartment.title
        }, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })

        fetchDepartments()

        setCurrentDepartment({})
        setEditDeparment(false)
    }

    const addEmployeeFunc = async (department) => {
        setAddEmployeeDepartment(department)
        setAddEmployee(true)
    }

    const stopAddEmployee = async () => {
        setAddEmployee(false)
        setAddEmployeeDepartment({})
    }

    const registerEmployee = async () => {
        const employeeData = {
            email: employeeEmail,
            first_name: employeeFirstName,
            last_name: employeeLastName,
            phone: employeePhone,
            birthday: employeeBirthday,
            department_id: addEmployeeDepartment.id,
            company_id: company.id,
        }

        const token = localStorage.getItem("token")
        try {

            const response = await $api.post("employees/", employeeData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
            
            stopAddEmployee()
        }
        catch (erorr) {
            setErrorMessage("Пользователь с такими данными уже существует.")
        }
            
    }

    return (
        <div>
            {departments.map((department) => (
                <div key={department.id}>
                    <div className={classes.departmentItem}>
                        {
                            currentDepartment.id === department.id && editDepartment
                                ?
                                <>
                                    <div className={classes.departmentMain}>
                                        <input
                                            type="text"
                                            id="departmentName"
                                            name="departmentName"
                                            value={currentDepartment.title}
                                            onChange={(event) => (setCurrentDepartment({ ...currentDepartment, title: event.target.value }))}
                                        />
                                        <button onClick={updateDepartment}>Сохранить</button>
                                    </div>
                                </>
                                :
                                <div className={classes.departmentMain}>
                                    <h3>{department.title}</h3>
                                    <button onClick={() => handleEditClick(department)}>Редактировать</button>
                                </div>
                        }
                    </div>

                    <div>
                        <h4>Сотрудники:</h4>
                        <ul>
                            {department.employees.map((employee, index) => {
                                return <div key={index}>
                                    {console.log(employee)}
                                    <li>{employee.first_name} {employee.last_name} (Рейтинг: {employee.rating})</li>
                                </div>
                            })}
                        </ul>
                        <div className={classes.grayLine}></div>
                    </div>

                    {
                        addEmployee && addEmployeeDepartment.id === department.id ?
                            <div>
                                <div className={classes.field}>
                                    <label htmlFor="employeeEmail">Почта сотрдуника:</label>
                                    <input
                                        type="text"
                                        id="employeeEmail"
                                        name="employeeEmail"
                                        value={employeeEmail}
                                        onChange={(event) => setEmployeeEmail(event.target.value)}
                                    />
                                </div>
                                <div className={classes.field}>
                                    <label htmlFor="employeeFirstName">Имя сотрудника:</label>
                                    <input
                                        type="text"
                                        id="employeeFirstName"
                                        name="employeeFirstName"
                                        value={employeeFirstName}
                                        onChange={(event) => setEmployeeFirstName(event.target.value)}
                                    />
                                </div>
                                <div className={classes.field}>
                                    <label htmlFor="employeeLastName">Фамилия сотрудника:</label>
                                    <input
                                        type="text"
                                        id="employeeLastName"
                                        name="employeeLastName"
                                        value={employeeLastName}
                                        onChange={(event) => setEmployeeLastName(event.target.value)}
                                    />
                                </div>
                                <div className={classes.field}>
                                    <label htmlFor="employeeBirthday">Дата рождения сотрудника:</label>
                                    <input
                                        type="date"
                                        id="employeeBirthday"
                                        name="employeeBirthday"
                                        value={employeeBirthday}
                                        onChange={(event) => setEmployeeBirthday(event.target.value)}
                                    />
                                </div>
                                <div className={classes.field}>
                                    <label htmlFor="employeePhone">Телефон сотрудника:</label>
                                    <input
                                        type="phone"
                                        id="employeePhone"
                                        name="employeePhone"
                                        value={employeePhone}
                                        onChange={(event) => setEmployeePhone(event.target.value)}
                                    />
                                </div>
                                <div style={{fontSize: "14px", color: "red", margin: "10px 0"}}>
                                    { errorMessage }
                                </div>
                                <div style={{display: "flex", justifyContent: "space-between", widows: "100%"}}>

                                    <button style={{ marginBottom: "20px" }} onClick={registerEmployee}>
                                        Добавить сотрдуника
                                    </button>
                                    <button style={{ marginBottom: "20px" }} onClick={stopAddEmployee}>
                                        Отменить добавление
                                    </button>
                                </div>
                            </div>
                            :
                            <button style={{ marginBottom: "20px" }} onClick={() => addEmployeeFunc(department)}>
                                Добавить сотрдуника
                            </button>
                    }


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
                    <div className={classes.whiteLine}></div>
                </div>
            ))}

            {
                addDepartment ?
                    <>
                        <div className={classes.field}>
                            <label htmlFor="newDepartmentName">Название отдела:</label>
                            <input
                                type="text"
                                id="newDepartmentName"
                                name="newDepartmentName"
                                value={newDepartmentName}
                                onChange={(event) => setNewDepartmentName(event.target.value)}
                            />
                        </div>
                        <button
                            onClick={addNewDepartment}
                        >
                            Добавить отдел
                        </button>
                    </>

                    :
                    <button
                        onClick={() => setAddDepartment(true)}
                    >
                        Добавить отдел
                    </button>
            }
        </div>
    );
};


export { DepartmentInfoTab, DepartmentsList };
