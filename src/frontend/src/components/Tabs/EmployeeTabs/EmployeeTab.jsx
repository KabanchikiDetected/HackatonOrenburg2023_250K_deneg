import React, { useState } from 'react';
import classes from './EmployeeTab.module.css'
import TabsManager from '../Tabs/TabsManager';
import { CompanyInfoTab, CompanyEditTab } from '../Tabs/CompanyTab/CompanyTab';
import { DepartmentInfoTab } from '../Tabs/DepartmentTab/DepartmentTab';
import TestHistoryTab from '../Tabs/TestTab/TestHistoryTab';
import UserInfoTab from '../Tabs/UserInfoTab/UserInfoTab';
import TestTab from '../Tabs/TestTab/TestTab';

const EmployeeTab = () => {
  const tabs = [
    {
        name: "Компания",
        value: "company",
        component: <CompanyEditTab />
    },
    {
        name: "Отдел",
        value: "department",
        component: <DepartmentInfoTab />
    },
    {
        name: "Мои данные",
        value: "userInfo",
        component: <UserInfoTab />
    },
    {
        name: "История тестирования",
        value: "testsHistory",
        component: <TestHistoryTab />
    },
    {
        name: "Обучение",
        value: "newTests",
        component: <TestTab />
    },
  ]

  return (
    <div>
        <TabsManager tabs={tabs} />
    </div>
  );
};

export default EmployeeTab;