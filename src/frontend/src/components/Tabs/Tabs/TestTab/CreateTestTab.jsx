import React, { useState, useEffect } from 'react';
import classes from "./CreateTestTab.module.css"
import { $educateApi } from '../../../../http/educate';

const CreateTestTab = (company) => {
    const [title, setTitle] = useState("")

    const [questions, setQuestions] = useState([{
        questionText: '',
        options: [{ optionText: '', isCorrect: true }]
    }]);

    const addQuestion = () => {
        setQuestions([...questions, {
            questionText: '',
            options: [{ optionText: '', isCorrect: true }]
        }]);
    };

    const addOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push({ optionText: '', isCorrect: false });
        setQuestions(updatedQuestions);
    };

    const handleQuestionChange = (questionIndex, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].questionText = text;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].optionText = text;
        setQuestions(updatedQuestions);
    };

    const toggleCorrectAnswer = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.forEach((option, index) => {
            option.isCorrect = index === optionIndex;
        });
        setQuestions(updatedQuestions);
    };

    const saveQuestion = () => {
        console.log(questions)
        const token = localStorage.getItem("token")

        const data = {
            title,
            questions: questions.map(question => {
                return {
                    question: question.questionText,
                    is_multianswer: false,
                    variants: question.options.map(option => {
                        return option.optionText
                    }),
                    answers: question.options.filter(option => {
                        return option.isCorrect
                    }).map(value => {
                        return value.optionText
                    }),
                }
            }),
            max_result: questions.length,
            total: questions.length
        }

        console.log(data)

        $educateApi.post("tests/", data, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })

        setQuestions([{
            questionText: '',
            options: [{ optionText: '', isCorrect: true }]
        }]);
        setTitle("")
    }

    return (
        <div>
            <div style={{margin: "0 0 20px 0"}}>
                <label htmlFor="title">Название теста: </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Название теста"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className={classes.whiteLine}></div>

            {questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                    <div>

                        <input
                            type="text"
                            placeholder="Вопрос"
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                        />
                    </div>

                    <div style={{ width: "100%" }}>
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} style={{ display: "flex", height: "40px", margin: "10px 0", alignItems: "center" }}>
                                <input
                                    type="text"
                                    placeholder="Вариант ответа"
                                    style={{ marginRight: "40px" }}
                                    value={option.optionText}
                                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                />
                                {
                                    option.isCorrect ?
                                        <h4>Правильный</h4>
                                        :
                                        <button style={{ margin: "auto auto auto 0" }} onClick={() => toggleCorrectAnswer(questionIndex, optionIndex)}>Сделать правильным</button>
                                }
                            </div>
                        ))}
                    </div>
                    <div>
                        <button onClick={() => addOption(questionIndex)} style={{marginBottom: "20px"}}>Добавить вариант ответа</button>
                    </div>

                    <div className={classes.whiteLine}></div>
                </div>

            ))}
            <div>
                <button onClick={addQuestion}>Добавить вопрос</button>
            </div>

            <div>
                <button onClick={saveQuestion}>
                    Сохранить
                </button>
            </div>
        </div>
    );
}


export default CreateTestTab;