import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../../custom-axios/custom-axios";
import "./AddOption.css";
import "./PaperList.css";

function AddOption({ projectId }) {

  const [paperName, SetName] = useState(``);
  const [numberOfChoices, setNumberChoices] = useState('');
  const [year, setYear] = useState('');
  const [questionCount, setQuestionCount] = useState('');

  const navigate = useNavigate();

  const handlePaperData = (event) => {

    event.preventDefault();

    // const labelClass = document.querySelector(".addContentLabel")
    // labelClass.style.color = "blue";

    const createPaperObj = {
      name: paperName,
      type: 1,
      year: parseInt(year),
      projectId: projectId,
      choiceCount: parseInt(numberOfChoices),
      questionCount: parseInt(questionCount)
    }

    /**
     * Create paper
     */
    customAxios.post(`api/papers/create`, createPaperObj)
      .then(response => {
        if (response.isLogout) {
          localStorage.clear();
          navigate("/");
        }

        else {
          localStorage.setItem("paperId", response.data.paperId);
          navigate("/addQuestion");
        }

      })
      .catch(err => {

      })


  }

  const buttonDisabled = useMemo(() => {
    if (paperName.length !== 0 && numberOfChoices > 0 && year > 0 && questionCount > 0) return false;

    else return true;

  }, [paperName, numberOfChoices, year, questionCount])

  return (
    <div className="paperScreen">
      <div className="outerBorder">
        <div className="addContent">
          <form onSubmit={handlePaperData}>
            <br></br>
            <div className="form-group">
              <br />
              <label className="addContentLabel"  >Paper Name</label>
              <br />
              <input
                type="text"
                value={paperName} className={`form-control`}
                placeholder="Enter Paper Name"
                onChange={(event) => SetName(event.target.value)}
              />
              <br />
              <label className="addContentLabel" >No of Choices</label>
              <br />
              <input
                type="number"
                value={numberOfChoices} className={`form-control`}
                placeholder="Enter No of Choices"
                onChange={(event) => setNumberChoices(event.target.value)}
              />
              <br />
              <label className="addContentLabel" >Year</label>
              <br />
              <input
                type="number"
                value={year} className={`form-control`}
                placeholder="Enter year"
                onChange={(event) => setYear(event.target.value)}
              />
              <br />
              <label className="addContentLabel" >Question Count</label>
              <br />
              <input
                type="number"
                value={questionCount} className={`form-control`}
                placeholder="Enter question count"
                onChange={(event) => setQuestionCount(event.target.value)}
              />
            </div>
            <button
              type="submit" className="paperCreateBtn" disabled={buttonDisabled}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div >
  );
}

export default AddOption;
