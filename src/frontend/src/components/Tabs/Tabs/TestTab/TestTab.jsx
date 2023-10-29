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

// class TestTab extends Component {
//   state = {
//     tests: [],
//   };

//   componentDidMount() {
//     // Выполняем GET-запрос к API для получения списка тестов
//     axios.get('/api/tests')
//       .then((response) => {
//         this.setState({ tests: response.data });
//       })
//       .catch((error) => {
//         console.error('Ошибка при получении данных:', error);
//       });
//   }

//   render() {
//     const { tests } = this.state;

//     return (
//       <div>
//         <h1>Список тестов</h1>
//         <ul>
//           {tests.map((test) => (
//             <li key={test._id}>
//               <div>
//                 <strong>Title:</strong> {test.title}
//               </div>
//               <button onClick={() => this.navigateToTest(test._id)}>Пройти тест</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   navigateToTest = (testId) => {
//     // Здесь вы можете добавить код для перенаправления пользователя на другую страницу
//     // Например, с использованием React Router
//     // import { useHistory } from 'react-router-dom';
//     // const history = useHistory();
//     // history.push(`/test/${testId}`);
//   };
// }

 
export default TestTab;
