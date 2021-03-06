import React from 'react'

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ answers, callback, question, questionNumber, totalQuestions, userAnswer }) => {
    return (
        <div style={{ color: '#fff' }}>
            <p className="number">Question: {questionNumber}</p>
            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            <div>
                {answers.map(answer => (
                    <div key={answer}>
                        <button disabled={userAnswer} value={answer} onClick={callback} className="choice">
                            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard
