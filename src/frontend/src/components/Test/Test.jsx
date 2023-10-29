import React, { useState } from "react";

const TestComponent = ({ test }) => {
  const [answers, setAnswers] = useState([]);

  const handleAnswerChange = (questionIndex, selectedOptions) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOptions;
    setAnswers(updatedAnswers);
  };

  const handleSubmitTest = (e) => {
    e.preventDefault()
    // Отправить список ответов на сервер
    // fetch("url-сервера", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(answers),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Обработать ответ от сервера
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     // Обработать ошибку
    //     console.error(error);
    //   });
  };

  console.log(test.questions)

  return (
    <div>
      <h2>{test.title}</h2>
      {test.questions.map((question, index) => (
        <QuestionComponent
          key={index}
          question={question}
          questionIndex={index}
          onAnswerChange={handleAnswerChange}
        />
      ))}
      <button onClick={handleSubmitTest}>Отправить тест</button>
    </div>
  );
};

const QuestionComponent = ({ question, questionIndex, onAnswerChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    let updatedOptions;
    if (question.is_multianswer) {
      if (selectedOptions.includes(option)) {
        updatedOptions = selectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      } else {
        updatedOptions = [...selectedOptions, option];
      }
    } else {
      updatedOptions = [option];
    }
    setSelectedOptions(updatedOptions);
    onAnswerChange(questionIndex, updatedOptions);
  };

  return (
    <div>
      <h3>{question.question}</h3>
      {question.variants.map((variant, index) => (
        <label key={index}>
          <input
            type={question.is_multianswer ? "checkbox" : "radio"}
            value={variant}
            checked={selectedOptions.includes(variant)}
            onChange={() => handleOptionChange(variant)}
          />
          {variant}
        </label>
      ))}
    </div>
  );
};

export default TestComponent;