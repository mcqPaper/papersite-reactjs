import { useEffect, useMemo, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import customAxios from "../../../custom-axios/custom-axios";
import "./AddQuestion.css";
import Choices from "./Choices";

function AddQuestion() {

  const [question, setQuestion] = useState('');
  const [choiceArray, setChoiceArray] = useState([]);
  const [changeChoice, setChangeChoice] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctChoice, setCorrectChoice] = useState('');
  const [questionArray, setQuestionArray] = useState([]);
  const [lastQuestion, setLastQuestion] = useState(null);
  const [numberOfChoices, setNumberOfChoices] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let paperId = localStorage.getItem(`paperId`);

    //Get question list
    customAxios.get(`api/questions/${paperId}/list`)
      .then(response => {
        if (response.isLogout) {
          localStorage.clear();
          navigate("/");
        }

        else {
          const resObj = response.data;
          const firstQuestion = resObj.questionArray[0];

          setNumberOfChoices(resObj.choiceCount);
          setLastQuestion(resObj.questionCount);
          setQuestionArray(resObj.questionArray);

          setCorrectChoice(firstQuestion.correctChoice);
          setChoiceArray(firstQuestion.choiceArray);
          setQuestion(firstQuestion.question);

        }

      })
      .catch(err => {

      })

  }, [])


  /**
   * Save choice
   * @param {string} value choice value
   * @param {string} id choice id
   */
  const saveChoice = (value, id) => {

    let array = choiceArray;
    array[id] = value;

    setChoiceArray(array);
    setChangeChoice(!changeChoice);
  }

  //Hide or show button according to the question
  useEffect(() => {
    const previousButton = document.querySelector(".previousButton");
    const nextButton = document.querySelector(".nextButton");

    if (questionNumber === 1) previousButton.style.display = "none";
    else previousButton.style.display = "inline";

    if (questionNumber === lastQuestion) nextButton.style.display = "none";
    else nextButton.style.display = "inline";

    localStorage.setItem(`questionNo`, questionNumber);
  }, [questionNumber, lastQuestion])


  /**
   * Render choices
   */
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
  }, [changeChoice, correctChoice, numberOfChoices])


  /**
   *call when previous button is clicked
   */
  const previousQuestion = () => {

    /**
     * save entered values
     */
    saveValues();

    let currentQuestionNo = questionNumber - 1;
    setQuestionNumber(currentQuestionNo);

    /**
     * Set values to show
     */
    setValues(currentQuestionNo);
  }


  /**
   * Call when next button is clicked
   */
  const nextQuestion = () => {

    /**
   * save entered values
   */
    saveValues();
    let currentQuestionNo = questionNumber + 1;
    setQuestionNumber(currentQuestionNo);


    /**
     * Set values to show
     */
    setValues(currentQuestionNo);
  }


  /**
   * Set values to show
   * @param {number} currentQuestionNo Current question number
   */
  const setValues = (currentQuestionNo) => {

    let currentQuestion = questionArray[currentQuestionNo - 1];

    if (currentQuestion !== undefined) {

      setCorrectChoice(currentQuestion.correctChoice);
      setChoiceArray(currentQuestion.choiceArray);
      setQuestion(currentQuestion.question);
    }

    else resetValues();

    setChangeChoice(!changeChoice);
  }

  /**
   * Save entered values
   */
  const saveValues = () => {

    let questionId = questionArray[questionNumber - 1].id;

    let array = questionArray;

    array[questionNumber - 1] = {
      id: questionId,
      question: question,
      correctChoice: correctChoice,
      choiceArray: choiceArray,
      questionNumber: questionNumber
    }


    setQuestionArray(array);

    let body = {
      question: question,
      correctChoice: correctChoice,
      choiceArray: choiceArray,
    }

    customAxios.post(`api/questions/${questionId}/save`, body)
      .then(response => {
        if (response.isLogout) {
          localStorage.clear();
          navigate("/");
        }

        else {

        }

      })
      .catch(err => {

      })
  }


  /**
   * Reset values to show
   */
  const resetValues = () => {
    setChoiceArray([]);
    setQuestion('');
    setCorrectChoice('');

    setChangeChoice(!changeChoice);
  }

  return (

    <div className="addQuestionBorder" >
      <h1 className="questionTitle">Question {questionNumber} </h1>
      <div>
        <CloseButton className="closeButton" onClick={() => navigate("/home")} />
      </div>
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
          className="questionSaveButton" onClick={saveValues}
        >
          Save
        </button>
        <button
          className="previousButton" onClick={previousQuestion}
        >
          Previous
        </button>
        <button
          className="nextButton" onClick={nextQuestion}
        >
          Next
        </button>

      </div>

    </div>);
}

export default AddQuestion;
