import React, { useEffect, useState } from 'react';
import TabsManager from '../Tabs/TabsManager';
import { CompanyInfoTab, CompanyEditTab } from '../Tabs/CompanyTab/CompanyTab';
import CreateTestTab from '../Tabs/TestTab/CreateTestTab';
import { DepartmentsList } from '../Tabs/DepartmentTab/DepartmentTab';
import TestHistoryTab from '../Tabs/TestTab/TestHistoryTab';
import UserInfoTab from '../Tabs/UserInfoTab/UserInfoTab';
import TestTab from '../Tabs/TestTab/TestTab';
import { getUserCompany } from '../../../http';
import HrInfoTab from '../Tabs/HrTabs/HrTabs';

const CompanyAdministratorTab = () => {
    const [company, setCompany] = useState(undefined)
    const [tabs, setTabs] = useState([])

    const getCompany = async () => {
        const company = await getUserCompany()
        setCompany(company)

        setTabs([
            {
                name: "Компания",
                value: "company",
                component: <CompanyEditTab />
            },
            {
                name: "Отделы",
                value: "department",
                component: <DepartmentsList company={company} />
            },
            {
                name: "HR`s",
                value: "hrs",
                component: <HrInfoTab company={company} />
            },
            {
                name: "Мои данные",
                value: "userInfo",
                component: <UserInfoTab />
            }
        ])
    }

    useEffect(() => {
        getCompany()
    }, [])


    return (
        <div>
            {
                company && tabs ?
                <TabsManager tabs={tabs} />
                :
                <></>
            }
        </div>
    );
};

export default CompanyAdministratorTab;