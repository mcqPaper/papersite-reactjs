
import './PaperCard.css';
function PaperCard(props) {
  //const [isCollapse, setIsCollapse] = useState(true)
  console.log(`test`, props.paper)
  console.log(`test`, props.collapseId, props.paper.id)
  function paperCardSelect() {
    props.setcollapseId(props.paper.id)
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
          <h1>Collapsed</h1>
        </div>
      }
    </div>);
}

export default PaperCard;
