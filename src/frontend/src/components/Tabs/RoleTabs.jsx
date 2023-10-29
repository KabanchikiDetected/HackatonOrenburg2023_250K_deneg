import React, { useEffect, useState } from 'react';
import EmployeeTab from './EmployeeTabs/EmployeeTab';
import HrTab from './HrTabs/HrTab';
import CompanyAdminTab from './CompanyAdministratorTabs/CompanyAdministratorTab';
import AdministratorTab from './AdministartorTabs/AdministartorTab';
import { getUser } from '../../http';

const RoleTabs = () => {
  const [userRole, setUserRole] = useState("employee")

  useEffect(() => {
    const func = async () => {
      const user = await getUser()
      setUserRole(user.role)
    }
    func()

  }, [])

  return (
    <div className="role-tabs">
      <div className="tab-buttons">
        {
            userRole === 'employee' ? <EmployeeTab/>
            :
            userRole === 'hr' ? <HrTab />
            :
            userRole === 'company_admin' ? <CompanyAdminTab/>
            :
            userRole === "administrator" ? <AdministratorTab/>
            :
            <></>
        }
      </div>
    </div>
  );
};

export default RoleTabs;