import React, { useEffect, useState } from 'react';
import classes from './CompanyTab.module.css'
import { createCompany, getUserCompany } from '../../../../http';
import { $api, putAuthenticatedRequest } from '../../../../http';


const CompanyInfoTab = () => {
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
            if (company.created) {
                setCompanyDate(company.created.split("T")[0].replace("-", "/"))
            }
            else {
                setCompanyDate("30/10/2023")
            }
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

const CompanyEditTab = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [companyId, setCompanyId] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [companyDescription, setCompanyDescription] = useState("")
    const [companyDate, setCompanyDate] = useState("")
    const [companyLogo, setCompanyLogo] = useState("")

    const [editedLogo, setEditedLogo] = useState(companyLogo);
    const [editedName, setEditedName] = useState(companyName);
    const [editedDescription, setEditedDescription] = useState(companyDescription);

    useEffect(() => {
        const func = async () => {
            const company = await getUserCompany()

            setCompanyId(company.id)
            setCompanyLogo(company.image)
            setCompanyName(company.title)
            setCompanyDescription(company.description)

            if (company.created) {
                setCompanyDate(company.created.split("T")[0].replace("-", "/"))
            }
            else {
                setCompanyDate("30/10/2023")
            }
        }
        func()
    }, [])

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedLogo(companyLogo)
        setEditedName(companyName)
        setEditedDescription(companyDescription)
    };

    const handleFinishEdit = () => {
        setIsEditing(false);
        setCompanyName(editedName)
        setCompanyDescription(editedDescription)
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedLogo(companyLogo);
        setEditedName(companyName);
        setEditedDescription(companyDescription);
    };

    const handleSaveClick = async () => {
        // Отправить изменения на сервер
        const updatedCompanyInfo = {
            title: editedName,
            description: editedDescription,
        };
        
        const token = localStorage.getItem("token")

        const response = await $api.put(`company/${companyId}/`, updatedCompanyInfo, {
            headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${token}`
            },
        })

        handleFinishEdit()
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setEditedLogo(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={classes.companyTab}>
            {isEditing ? (
                <div className={classes.companyTab}>
                    <label>
                        Логотип:
                        <input type="file" accept="image/*" onChange={handleLogoChange} />
                        {editedLogo && <img className={classes.logoOut} src={editedLogo} alt="Edited Logo" />}
                    </label>
                    <label>
                        Название компании:
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    </label>
                    <label>
                        Описание компании:
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                    </label>
                    <button onClick={handleSaveClick}>Сохранить</button>
                    <button onClick={handleCancelClick}>Отменить</button>
                </div>
            ) : (
                <div className={classes.companyTab}>
                    <img src={companyLogo} alt="Company Logo" className={classes.logo} />
                    <h1 className={classes.name}>{companyName}</h1>
                    <p className={classes.description}>{companyDescription}</p>
                    <p className={classes.joinDate}>Дата присоединения: {companyDate}</p>
                    <button onClick={handleEditClick}>Изменить</button>
                </div>
            )}
        </div>
    );
};


export { CompanyInfoTab, CompanyEditTab };
