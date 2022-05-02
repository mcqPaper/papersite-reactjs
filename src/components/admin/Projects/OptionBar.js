import { useContext, useMemo } from "react";
import { UserContext } from "../../../react-hooks/react-hooks";
import "./PaperList.css";

function OptionBar({ option }) {

  const { setOption, optionType } = useContext(UserContext);



  const getClass = useMemo(() => {
    let className;
    switch (option.id) {
      case 0:
        className = "paperOption1"
        break;
      case 1:
        className = "paperOption2"
        break;
      case 2:
        className = "paperOption3"
        break;
    }
    return className;
  }, [option.id])

  const IsSelect = useMemo(() => {
    let selectClass;
    if (optionType === option.id) selectClass = "optionSelect";
    else selectClass = "optionCard";
  },
    [optionType])

  return (<div className={getClass}>
    <div className="optionCard" color="white" onClick={() => setOption(option.id)}>{option.name}</div>
  </div>);
}

export default OptionBar;
