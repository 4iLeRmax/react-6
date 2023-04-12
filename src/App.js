import './index.scss';
import React, { useState } from 'react';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({
  restartGame,
  correct
}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <button onClick={restartGame}>Попробовать снова</button>
    </div>
  );
}

function Game({
  step,
  question,
  onClickVariants
}) {
  const percentage = Math.round(step / questions.length * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((item, index) =>
          <li onClick={()=> onClickVariants(index)} key={index}>{item}</li>
        )}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const question = questions[step];
  const [correct, setCorrect] = useState(0);

  const onClickVariants = index=>{
    // console.log(step, index);
    setStep(step + 1);
    question.correct == index && setCorrect(correct + 1); 
  }
  const restartGame = ()=>{
    setStep(0);
  }

  return (
    <div className="App">
      {step !== questions.length ? <Game step={step} question={question} onClickVariants={onClickVariants}/> : <Result restartGame={restartGame} correct={correct}/>}
      {/* <Result /> */}
    </div>
  );
}

export default App;
