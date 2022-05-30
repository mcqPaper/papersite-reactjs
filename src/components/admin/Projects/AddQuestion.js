import { useEffect, useMemo, useState } from "react";
import "./AddQuestion.css";
import Choices from "./Choices";

function AddQuestion() {

  const [question, setQuestion] = useState('');
  const [choiceArray, setChoiceArray] = useState([]);
  const [changeChoice, setChangeChoice] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctChoice, setCorrectChoice] = useState('');
  const [questionArray, setQuestionArray] = useState([]);
  const [lastQuestion, setLastQuestion] = useState(5);

  let numberOfChoices = parseInt(localStorage.getItem(`numberOfChoices`)) || 4;


  const saveChoice = (value, id) => {
    let array = choiceArray;
    array[id] = value;
    setChoiceArray(array);
    setChangeChoice(changeChoice ? false : true)
  }

  useEffect(() => {
    const previousButton = document.querySelector(".previousButton");
    const nextButton = document.querySelector(".nextButton");

    if (questionNumber === 1) previousButton.style.display = "none";
    else previousButton.style.display = "inline";

    if (questionNumber === lastQuestion) nextButton.style.display = "none";
    else nextButton.style.display = "inline";

  }, [questionNumber, lastQuestion])

  const answers = useMemo(() => {
    let choicesArray = [];

    for (let iteration = 0; iteration < numberOfChoices; iteration++) {
      choicesArray.push(
        <Choices
          key={iteration}
          id={iteration}
          saveChoice={saveChoice}
          choice={choiceArray[iteration]}
          setCorrectChoice={setCorrectChoice}
          correctChoice={correctChoice}
        >
        </Choices >
      )
    }

    return choicesArray;
  }, [changeChoice, correctChoice])


  const saveQuestion = (event) => {
    setChoiceArray([]);
    setQuestion('');
    setChangeChoice(changeChoice ? false : true)
    setCorrectChoice('');
    localStorage.setItem(`questionNumber`, parseInt(localStorage.getItem(`questionNumber`)) + 1);

    setQuestionNumber(questionNumber + 1);

    let array = questionArray;

    array[questionNumber - 1] = {
      question: question,
      correctChoice: correctChoice,
      choiceArray: choiceArray
    }

    setQuestionArray(array);
    console.log(`Array`, questionArray)
  }

  const previousQuestion = (event) => {
    let currentQuestionNo = questionNumber - 1;
    setQuestionNumber(currentQuestionNo);
    let currentQuestion = questionArray[currentQuestionNo - 1];

    setCorrectChoice(currentQuestion.correctChoice);
    setChoiceArray(currentQuestion.choiceArray);
    setQuestion(currentQuestion.question);

    setChangeChoice(changeChoice ? false : true);

  }


  return (

    <div className="addQuestionBorder" >
      <h1 className="questionTitle">Question {questionNumber} </h1>
      <div className="question">
        <label>Enter Question</label>
        <textarea
          value={question} className="questionInput"
          onChange={(event) => setQuestion(event.target.value)}
        />
      </div>
      <div className="answers">
        {answers}
        <button
          className="questionSaveButton" onClick={saveQuestion}
        >
          Save
        </button>
        <button
          className="previousButton" onClick={previousQuestion}
        >
          Previous
        </button>
        <button
          className="nextButton" onClick={saveQuestion}
        >
          Next
        </button>

      </div>

    </div>);
}

export default AddQuestion;
