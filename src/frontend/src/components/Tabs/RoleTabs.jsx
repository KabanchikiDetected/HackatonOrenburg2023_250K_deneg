import React, { useState } from 'react';
import EmployeeTab from './EmployeeTabs/EmployeeTab';
import HrTab from './HrTabs/HrTab';
import CompanyAdminTab from './CompanyAdministratorTabs/CompanyAdministratorTab';
import AdministratorTab from './AdministartorTabs/AdministartorTab';

const RoleTabs = () => {
  const [activeTab, setActiveTab] = useState('employee');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="role-tabs">
      <div className="tab-buttons">
        {
            activeTab === 'employee' ? <EmployeeTab/>
            :
            activeTab === 'hr' ? <HrTab />
            :
            activeTab === 'company_admin' ? <CompanyAdminTab/>
            :
            activeTab === "administrator" ? <AdministratorTab/>
            :
            <></>
        }
    
        {/* <button
          className={activeTab === 'employee' ? 'active' : ''}
          onClick={() => handleTabChange('employee')}
        >
          Employee
        </button>
        <button
          className={activeTab === 'hr' ? 'active' : ''}
          onClick={() => handleTabChange('hr')}
        >
          HR
        </button>
        <button
          className={activeTab === 'company_admin' ? 'active' : ''}
          onClick={() => handleTabChange('company_admin')}
        >
          Company Admin
        </button>
        <button
          className={activeTab === 'administrator' ? 'active' : ''}
          onClick={() => handleTabChange('administrator')}
        >
          Administrator
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'employee' && <EmployeeTab />}
        {activeTab === 'hr' && <HrTab />}
        {activeTab === 'company_admin' && <CompanyAdminTab />}
        {activeTab === '' && <AdministratorTab />} */}
      </div>
    </div>
  );
};

export default RoleTabs;