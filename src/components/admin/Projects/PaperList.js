import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PaperList.css";
function PaperList() {

  return (
    <div className="paperList">
      <div className="paperListTop">
        <FontAwesomeIcon icon={faUserCircle} size="3x" className='userIcon' />

      </div>
      <div className="optionBar"> </div>
      <div className="paperScreen">
        <div className="filterBar"></div>
        <div className="paperListContent"></div>
      </div>
    </div>);
}

export default PaperList;
