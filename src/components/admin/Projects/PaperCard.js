function PaperCard({ paper }) {
  console.log(`test`, paper)

  return (<div>
    <h1>{paper.name}</h1>
  </div>);
}

export default PaperCard;
