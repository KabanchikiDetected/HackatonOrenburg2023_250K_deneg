import React, { useEffect, useState } from 'react';
import classes from './DepartmentTab.module.css'
import { getUserCompany } from '../../../../http';


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


export { DepartmentInfoTab };
