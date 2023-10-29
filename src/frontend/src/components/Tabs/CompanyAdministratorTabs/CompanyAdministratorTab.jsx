import React, { useState } from 'react';
import TabsManager from '../Tabs/TabsManager';
import { CompanyInfoTab, CompanyEditTab } from '../Tabs/CompanyTab/CompanyTab';
import CreateTestTab from '../Tabs/TestTab/CreateTestTab';
import { DepartmentsList } from '../Tabs/DepartmentTab/DepartmentTab';
import TestHistoryTab from '../Tabs/TestTab/TestHistoryTab';
import UserInfoTab from '../Tabs/UserInfoTab/UserInfoTab';
import TestTab from '../Tabs/TestTab/TestTab';

const CompanyAdministratorTab = () => {
  const tabs = [
    {
        name: "Компания",
        value: "company",
        component: <CompanyEditTab />
    },
    {
        name: "Отдел",
        value: "department",
        component: <DepartmentsList />
    },
    {
        name: "Мои данные",
        value: "userInfo",
        component: <UserInfoTab />
    },
    {
        name: "Создать тест",
        value: "createTest",
        component: <CreateTestTab />
    }
  ]

  return (
    <div>
        <TabsManager tabs={tabs} />
    </div>
  );
};

export default CompanyAdministratorTab;