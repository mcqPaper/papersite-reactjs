import { useContext, useMemo } from 'react';
import { UserContext } from '../../../react-hooks/react-hooks';
import PaperCard from './PaperCard';
import "./PaperList.css";
/**
 * Render paper screen components
 * @returns paper screen UI
 */
function ListOption() {
  const { paperArray, optionType } = useContext(UserContext);
  console.log('xx', paperArray)

  const paperList = useMemo(() => {
    return paperArray.map((paper) => {
      //console.log(paper)
      <PaperCard paper={paper}></PaperCard>
    })
  }, [paperArray, optionType])
  console.log(paperList)

  return (
    <div className="paperScreen">
      <div className="filterBar"></div>
      <div className="paperListContent">
        {/* {paperArray.map((paper) => {
          <PaperCard paper={paper} />
        })} */}
        {paperList}
        {/* <h1>CCCC</h1> */}
      </div>
    </div>
  );
}

export default ListOption;
