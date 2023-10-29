import React, { useState, useEffect } from 'react';
import classes from './EmployeeTab.module.css'
import TabsManager from '../Tabs/TabsManager';
import { CompanyInfoTab } from '../Tabs/CompanyTab/CompanyTab';
import { DepartmentInfoTab } from '../Tabs/DepartmentTab/DepartmentTab';
import TestHistoryTab from '../Tabs/TestTab/TestHistoryTab';
import UserInfoTab from '../Tabs/UserInfoTab/UserInfoTab';
import TestTab from '../Tabs/TestTab/TestTab';
import { getEmployee } from '../../../http';

const EmployeeTab = () => {
  const [employee, setEmployee] = useState(undefined)
  const [tabs, setTabs] = useState([])

  const getEmployeeFunc = async () => {
    const employee = await getEmployee()
    console.log(employee)

    setEmployee(employee)

    setTabs([
      {
        name: "Компания",
        value: "company",
        component: <CompanyInfoTab />
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
    ])
  }

  useEffect(() => {
    getEmployeeFunc()
  }, [])


  return (
    <div>
      {
        employee && tabs ?
          <TabsManager tabs={tabs} />
          :
          <></>
      }
    </div>
  );
};


export default EmployeeTab;