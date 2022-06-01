import { useContext, useMemo, useState } from 'react';
import { UserContext } from '../../../react-hooks/react-hooks';
import PaperCard from './PaperCard';
import "./PaperList.css";
/**
 * Render paper screen components
 * @returns paper screen UI
 */
function ListOption() {
  const [collapseId, setcollapseId] = useState(null)
  const { paperArray } = useContext(UserContext);

  const paperList = useMemo(() => {


    return paperArray.map((paper) => (
      <PaperCard
        key={paper.id}
        paper={paper}
        setcollapseId={setcollapseId}
        collapseId={collapseId}
      >
      </PaperCard>
    ))
  }, [paperArray, collapseId]);


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
