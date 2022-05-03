import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./ErrorMessage.css";

function ErrorMessage({ message, path }) {

  let navigate = useNavigate();

  const errorCloseClick = () => {
    localStorage.setItem("hasError", false);
    navigate(path);
  }

  return (
    <div className='fullPage'>
      <div className="mainBox">
        <CloseButton className="errorClose" onClick={() => errorCloseClick()} />

        <div className="content">
          <div className="errorTitle" >
            <FontAwesomeIcon icon={faTriangleExclamation} size="1x" className='errorIcon' />

            ERROR OCCUR !
          </div>
          <div className="errorContent">
            {message ? message : `Error`}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
