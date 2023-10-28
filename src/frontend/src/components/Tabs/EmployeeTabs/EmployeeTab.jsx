import React, { useState } from 'react';
import classes from './EmployeeTab.module.css'

const EmployeeTab = () => {
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');
  const [testHistory, setTestHistory] = useState([]);

  // Функция для прохождения теста
  const takeTest = (testId) => {
    // Здесь можно добавить логику для прохождения теста
    console.log(`Taking test with ID: ${testId}`);
  };

  return (
    <div className={classes.employeeTab}>
      <h2>Employee Tab</h2>
      <div className={classes.departmentInfo}>
        <h3>Department: {department}</h3>
        <h3>Company: {company}</h3>
      </div>
      <div className={classes.testHistory}>
        <h3>Test History</h3>
        {testHistory.length > 0 ? (
          <ul>
            {testHistory.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
        ) : (
          <p>No test history</p>
        )}
      </div>
      <div className={classes.takeTest}>
        <h3>Take Test</h3>
        <button onClick={() => takeTest(1)}>Take Test 1</button>
        <button onClick={() => takeTest(2)}>Take Test 2</button>
        {/* Добавьте здесь кнопки или другие компоненты для выбора и прохождения тестов */}
      </div>
    </div>
  );
};

export default EmployeeTab;