import React, { useState } from 'react';
import { fetchQuestions, Difficulty } from './API';
import './index.css'
import QuestionCard from './components/QuestionCard'

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY))

  const startQuiz = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {
    console.log('dfdf')
  }

  return (
    <div>
      <h1 style={{ color: '#fff' }}>QuizBiz</h1>
      <button className="start" onClick={startQuiz}>Start Quiz!</button>
      <p className="score">Score: </p>
      {/* <QuestionCard
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  )
}

export default App;
