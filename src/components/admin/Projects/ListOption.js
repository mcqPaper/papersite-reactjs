import { useContext, useMemo } from 'react';
import { UserContext } from '../../../react-hooks/react-hooks';
import PaperCard from './PaperCard';
import "./PaperList.css";
/**
 * Render paper screen components
 * @returns paper screen UI
 */
function ListOption() {
  const {
    paperArray, optionType } = useContext(UserContext);

  const paperList = useMemo(() => {


    return paperArray.map((paper) => (
      <PaperCard
        key={paper.id}
        paper={paper}
      >
      </PaperCard>
    ))
  }, [paperArray]);

  console.log(paperList)

  return (
    <div className="paperScreen">
      <div className="filterBar"></div>
      <div className="paperListContent">
        {paperList}
      </div>
    </div>
  );
}

export default ListOption;
