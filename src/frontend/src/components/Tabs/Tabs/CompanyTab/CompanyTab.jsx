import React from 'react';
import classes from './CompanyTab.module.css'

const CompanyInfoTab = () => {
    return (
        <div className={classes.companyTab}>
            <img src="logo.png" alt="Company Logo" className={classes.logo} />
            <h1 className={classes.name}>Company Name</h1>
            <p className={classes.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Fusce consectetur semper ligula vitae dictum.
            </p>
            <p className={classes.joinDate}>Joined: 01/01/2022</p>
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
