import { EditorState, ContentState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import EditorBox from '../commons/Editor'
import config from 'Config'

export default class extends React.Component {
  constructor() {
    super();
    this.state = { 
      url: '',
      method: '',
      name: '', 
      title: '' 
    }
    this.load = () => this._load();
    this.handleSubmit = (text) => this._handleSubmit(text)
    this.handleInputChange = (e) => this._handleInputChange(e);
  }
  _load() {
    $.ajax({
      url: this.state.url,
      dataType: 'json',
      xhrFields: { withCredentials: true }
    }).
    done((data) => {
      this.setState({ name: data.name, title: data.title })
      var contentState = stateFromHTML(data.text);
      var editorState = EditorState.createWithContent(contentState);
      this.refs.editor.setState({ editorState: editorState })
    })
  }
  componentDidMount() {
    if(this.props.params.action=='new') {
      this.setState({
        url: config.domain + '/dashboard/articles.json',
        method: 'POST'
      })
    } else {
      this.setState({
        url: config.domain + '/dashboard/articles/' + this.props.params.id +  '.json',
        method: 'PUT'
      }, () => this.load())
    }
  }
  _handleSubmit(text) {
    var payload = { 
      article: { 
        name:  this.state.name, 
        title: this.state.title, 
        text:  text 
      } 
    }
    $.ajax({
      url: this.state.url,
      dataType: 'json',
      data: payload,
      type: this.state.method,
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
        <label>名稱</label>
        <input type='text' name='name' value={this.state.name} onChange={this.handleInputChange} />
        <br/>
        <label>標題</label>
        <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange} />
        <EditorBox ref='editor' onSubmit={this.handleSubmit} />
      </div>
    )
  }
}