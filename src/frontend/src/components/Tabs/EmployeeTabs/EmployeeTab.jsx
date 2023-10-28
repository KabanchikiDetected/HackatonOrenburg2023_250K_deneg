import React, { useState } from 'react';
import classes from './EmployeeTab.module.css'
import TabsManager from '../Tabs/TabsManager';
import { CompanyInfoTab, CompanyEditTab } from '../Tabs/CompanyTab/CompanyTab';
import UserInfoTab from '../Tabs/UserInfoTab/UserInfoTab';
import TestTab from '../Tabs/TestTab/TestTab';

const EmployeeTab = () => {
  const tabs = [
    {
        name: "Компания",
        value: "company",
        component: <CompanyInfoTab />
    },
    {
        name: "Мои данные",
        value: "userInfo",
        component: <UserInfoTab />
    },
    {
        name: "Тесты",
        value: "tests",
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