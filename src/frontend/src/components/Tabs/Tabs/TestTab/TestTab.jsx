import React, { useEffect, useState } from 'react';
import classes from './TestTab.module.css'
import { getTests } from '../../../../http/educate';
import TestComponent from '../../../Test/Test';

const TestTab = () => {
    const [test, setTest] = useState()

    useEffect(() => {
        const func = async () => {
            const test = await getTests()

            console.log(test)

            setTest(test)
        }
        func()
    }, [])

    return (
        <div>
            {
                test ?
                <TestComponent test={test}/>
                :
                ""
            }
        </div>
    );
}
 
export default TestTab;