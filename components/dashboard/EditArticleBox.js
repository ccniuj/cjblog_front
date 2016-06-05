import { EditorState, ContentState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import EditorBox from '../commons/Editor'
import config from 'Config'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' }
    this.handleSubmit = (text) => this._handleSubmit(text);
    this.handleInputChange = (e) => this._handleInputChange(e);
  }
  load() {
    $.ajax({
      url: config.domain + '/dashboard/articles/' + this.props.params.id + '/edit.json',
      dataType: 'json',
      xhrFields: { withCredentials: true }
    }).
    done(function(data){
      this.setState({ title: data.title })
      var contentState = stateFromHTML(data.text);
      // var contentState = ContentState.createFromText(data.text);
      var editorState = EditorState.createWithContent(contentState);
      this.refs.editor.setState({ editorState: editorState })
    }.bind(this))
  }
  componentDidMount() {
    this.load()
  }
  _handleSubmit(text) {
    var payload = { article: { title: this.state.title, text: text } }
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
  _handleInputChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  render() {
    return (
      <div>
        <label>標題</label>
        <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange} />
        <EditorBox ref='editor' onSubmit={this.handleSubmit} />
      </div>
    )
  }
}