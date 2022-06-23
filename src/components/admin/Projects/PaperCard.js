
import { useNavigate } from "react-router-dom";
import './PaperCard.css';

function PaperCard(props) {
  //const [isCollapse, setIsCollapse] = useState(true)
  console.log(`test`, props.paper)
  console.log(`test`, props.collapseId, props.paper.id)
  const navigate = useNavigate();


  function paperCardSelect() {
    props.setcollapseId(props.paper.id)
  }

  function navigateToQuestions() {
    localStorage.setItem("paperId", props.paper.id);
    navigate("/addQuestion");
  }

  return (
    <div className="class-container">
      <div className='paper-card' onClick={paperCardSelect}>
        <table>
          <tbody>
            <tr>
              <td>
                {props.paper.id}
              </td>
              <td>
                {props.paper.name}
              </td>
              <td>
                {props.paper.year}
              </td>
              <td>
                {props.paper.type}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {
        props.collapseId !== props.paper.id ? <div></div> : <div>
          <button className='goToQuestions' onClick={navigateToQuestions}>Go to Questions</button>
        </div>
      }
    </div>);
}

export default PaperCard;
