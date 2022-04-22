import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {selectAnswer, postAnswer, fetchQuiz} from "../state/action-creators"

function Quiz(props) {
  const {quiz, postAnswer, selectAnswer, selectedAnswer, fetchQuiz} = props

  useEffect(() => {
    fetchQuiz();
  }, [])

  const handleSelectClick = (id) => {
    selectAnswer(id)
  }

  const handleOnSubmit = (evt) => {
    evt.preventDefault()
    postAnswer({
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer
    })
  }
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={selectedAnswer === quiz.answers[0].answer_id ? "answer selected" : "answer"}>
                {quiz.answers[0].text}
                <button onClick={() => handleSelectClick(quiz.answers[0].answer_id)}>
                  {selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={selectedAnswer === quiz.answers[1].answer_id ? "answer selected" : "answer"}>
                {quiz.answers[1].text}
                <button onClick={() => handleSelectClick(quiz.answers[1].answer_id)}>
                  {selectedAnswer === quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button onClick={handleOnSubmit} disabled={!selectedAnswer} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    quiz: state.quiz,
    quiz_id: state.quiz_id,
    question: state.question,
    answers: state.answers,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, {selectAnswer, postAnswer, fetchQuiz})(Quiz)