import EditorBox from '../commons/Editor'

export default class extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <EditorBox ref='editor' />
      </div>
    )
  }
}