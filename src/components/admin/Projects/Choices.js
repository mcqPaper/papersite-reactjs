import { useMemo } from "react";
import "./Choices.css";

function Choices({ id, saveChoice, choice, setCorrectChoice, correctChoice }) {

  const placeholder = useMemo(() => {
    return `Enter choice ${id + 1}`;
  }, [id])

  const checked = useMemo(() => {
    if (correctChoice === "") return false;
    else if (id === correctChoice) return true;
    else return false
  }, [correctChoice, id])

  return (
    <div className="choice">
      <input type="radio" value="option3" className="radioInput"
        checked={checked} onChange={(event) => setCorrectChoice(id)} />

      <textarea
        value={choice === undefined ? '' : choice} className="choiceInput" placeholder={placeholder}
        onChange={(event) => saveChoice(event.target.value, id)}
      />
    </div>
  );
}

export default Choices;
