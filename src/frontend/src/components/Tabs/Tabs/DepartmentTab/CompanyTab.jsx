import React, { useEffect, useState } from 'react';
import classes from './CompanyTab.module.css'
import { getUserCompany } from '../../../../http';


const CompanyInfoTab = () => {
    const [companyName, setCompanyName] = useState("")
    const [companyDescription, setCompanyDescription] = useState("")
    const [companyDate, setCompanyDate] = useState("")

    useEffect(() => {
        const func = async () => {
            const company = await getUserCompany()
            setCompanyName(company.title)
            setCompanyDescription(company.description)
            setCompanyDate(company.created.split("T")[0].replace("-", "/"))
        }
        func()
    }, [])

    return (
        <div className={classes.companyTab}>
            <img src="logo.svg" alt="Company Logo" className={classes.logo} />
            <h1 className={classes.name}>{companyName}</h1>
            <p className={classes.description}>
                {companyDescription}
            </p>
            <p className={classes.joinDate}>Дата присоединения: {companyDate}</p>
        </div>
    );
};

const CompanyEditTab = () => {
    return (
        <div className={classes.companyTab}>
            <input type="file" className={classes.logoInput} />
            <input type="text" placeholder="Company Name" className={classes.nameInput} />
            <textarea placeholder="Description" className={classes.descriptionInput}></textarea>
            <input type="date" className={classes.joinDateInput} pattern='\d{4}-\d{2}-\d{2}'/>
            <button className={classes.saveButton}>Изменить</button>
        </div>
    );
};

export { CompanyInfoTab, CompanyEditTab };
