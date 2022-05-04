import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useMemo } from 'react';
import { UserContext } from '../../../react-hooks/react-hooks';
import AddOption from "./AddOption";
import ListOption from './ListOption';
import OptionBar from "./OptionBar";
import "./PaperList.css";

/**
 * render paper list, overview and paper add UI
 * @returns Paper list, overview and paper add UI
 */
function PaperList() {

  const { optionArray, optionType, projectId } = useContext(UserContext);

  /**
   * Render option bar
   */
  const optionRender = useMemo(() => {

    return optionArray.map((option) => (
      <OptionBar
        key={option.id}
        option={option}
      >
      </OptionBar>
    ))
  }, [optionArray])


  /**
   * change content according to the option type
   */
  const content = useMemo(() => {

    if (optionType === 1) {
      return <ListOption projectId={projectId}></ListOption>
    }

    if (optionType === 2) {
      return <AddOption projectId={projectId}></AddOption>
    }

    else {
      return <div></div>
    }

  }, [optionType, projectId])


  return (
    <div className="paperList">
      <div className="paperListTop">
        <FontAwesomeIcon icon={faUserCircle} size="3x" className='userIcon' />
      </div>
      <div className="optionBar">
        {optionRender}
      </div>
      {content}
    </div >
  );
}

export default PaperList;
