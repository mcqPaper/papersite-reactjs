import { useContext, useMemo } from "react";
import { UserContext } from "../../../react-hooks/react-hooks";
import "./PaperList.css";

/**
 * Render option
 * @param {object} option contain option id and name
 * @returns option UI
 */
function OptionBar({ option }) {

  const { setOption, optionType } = useContext(UserContext);

  /**
   * Get class of options of the option bar
   */
  const getClass = useMemo(() => {
    let className;
    switch (option.id) {
      case 0:
        className = "paperOption paperOption1"
        break;
      case 1:
        className = "paperOption paperOption2"
        break;
      case 2:
        className = "paperOption paperOption3"
        break;
      default:
        className = "paperOption paperOption3"
    }
    return className;
  }, [option.id])


  /**
   * Get class of option according to the option
   */
  const IsSelect = useMemo(() => {
    let selectClass;
    if (optionType === option.id) selectClass = "optionCard selectedOPtion";
    else selectClass = "optionCard";

    return selectClass;
  },
    [optionType, option.id])

  return (<div className={getClass}>
    <div className={IsSelect} onClick={() => setOption(option.id)}>{option.name}</div>
  </div>);

}

export default OptionBar;
