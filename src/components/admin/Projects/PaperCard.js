
import { useState } from 'react';
import './PaperCard.css';

function PaperCard(paper) {
  const [isCollapse, setIsCollapse] = useState(true)
  console.log(`test`, paper.paper)

  return (
    <div className="class-container">
      <div className='paper-card' onClick={() => setIsCollapse(!isCollapse)}>
        <table>
          <tbody>
            <tr>
              <td>
                {paper.paper.id}
              </td>
              <td>
                {paper.paper.name}
              </td>
              <td>
                {paper.paper.year}
              </td>
              <td>
                {paper.paper.type}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {
        isCollapse ? <div></div> : <div>
          <h1>Collapsed</h1>
        </div>
      }
    </div>);
}

export default PaperCard;
