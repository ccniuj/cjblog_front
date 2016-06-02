import { EditorState, ContentState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import EditorBox from '../commons/Editor'
import config from 'Config'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = (data) => this._handleSubmit(data)
  }
  load() {
    $.ajax({
      url: config.domain + '/dashboard/articles/' + this.props.params.id + '.json',
      dataType: 'json',
      xhrFields: { withCredentials: true }
    }).
    done(function(data){
      // var contentState = ContentState.createFromText(data.text);
      var contentState = stateFromHTML(data.text);
      console.log(contentState);
      var editorState = EditorState.createWithContent(contentState);
      console.log(editorState)
      this.refs.editor.setState({ editorState: editorState })
    }.bind(this))
  }
  componentDidMount() {
    this.load()
  }
  _handleSubmit(data) {
    console.log(data)
    var payload = { article: data }
    $.ajax({
      url: config.domain + '/dashboard/articles/' + this.props.params.id + '.json',
      dataType: 'json',
      data: payload,
      type: 'PUT',
      xhrFields: { withCredentials: true },
      success: function(data) {
        console.log(data)
      }.bind(this),
      error: function(xhr) {
      }.bind(this)
    });
  }
  render() {
    return (
      <div>
        <EditorBox ref='editor' onSubmit={this.handleSubmit} />
      </div>
    )
  }
}