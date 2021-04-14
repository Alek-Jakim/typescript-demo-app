import React, { useState } from 'react';
import { rightSound, wrongSound } from './Sounds'
import useSound from 'use-sound';
import './index.css'

//Sounds

//Components
import QuestionCard from './components/QuestionCard'
//Types
import { fetchQuestions, Difficulty, QuestionState } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;

const App = () => {

  const [playRight] = useSound(rightSound);
  const [playWrong] = useSound(wrongSound);


  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState('');

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //Users answer

      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) {
        playRight(rightSound);
        setScore(prev => prev + 1);
      } else {
        setShowCorrectAnswer(`The correct answer was: ${questions[number].correct_answer}`)
        playWrong(wrongSound);
      }

      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      setUserAnswers(prev => [...prev, answerObj]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    setShowCorrectAnswer('');
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="main">
      <h1 style={{ color: '#fff' }}>QuizBiz</h1>
      <div className="container">
        {
          gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startQuiz}>Start Quiz!</button>
          ) : null}

        {!gameOver ? (<p className="score">Score: {score}</p>) : null}
        {loading && (<p>Loading Questions...</p>)}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        <p className="correct_answer">{showCorrectAnswer}</p>
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>Next Question</button>
        ) : null}
      </div>
    </div>
  )
}

export default App;
