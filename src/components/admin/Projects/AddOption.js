import { useMemo, useState } from "react";
import "./AddOption.css";
import "./PaperList.css";
function AddOption(props) {
  const [paperName, SetName] = useState(``);
  const [numberOfChoices, setNumberChoices] = useState(``);

  const handlePaperData = (event) => {
    event.preventDefault();
    console.log(`name`, paperName);
    console.log(`number`, numberOfChoices);
    console.log(`projectId`, props.projectId);
  }
  const buttonDisabled = useMemo(() => {
    if (paperName.length !== 0 && numberOfChoices > 0) return false;

    else return true;

  }, [paperName, numberOfChoices])

  return (
    <div className="paperScreen">
      <div className="outerBorder">
        <div className="addContent">
          <form onSubmit={handlePaperData}>
            <br></br>
            <h2>Paper Data</h2>
            <div className="form-group">
              <label  >Paper Name</label>
              <br />
              <input
                type="text"
                value={paperName} className={`form-control`}
                placeholder="Enter Paper Name"
                onChange={(event) => SetName(event.target.value)}
              />
              <label >No of Choices</label>
              <br />
              <input
                type="number"
                value={numberOfChoices} className={`form-control`}
                placeholder="Enter No of Choices"
                onChange={(event) => setNumberChoices(event.target.value)}
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
