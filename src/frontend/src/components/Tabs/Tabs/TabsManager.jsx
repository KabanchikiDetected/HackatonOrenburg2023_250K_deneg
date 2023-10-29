import React, { useState } from 'react';
import classes from './TabsManager.module.css'

const TabsManager = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[1].value);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={classes.tabs}>
            <div className={classes.tabList}>
                {tabs.map(tab => {
                    return <button
                        key={tab.value}
                        className={activeTab === tab.value ? classes.active : ''}
                        onClick={() => handleTabChange(tab.value)}
                    >
                        {tab.name}
                    </button>

                })}
            </div>
            <div className={classes.tabContent}>
                {tabs.map(tab => {
                    return activeTab === tab.value && <div key={tab.value}> {tab.component}</div>
                })}
            </div>
        </div>
    );
}

export default TabsManager;