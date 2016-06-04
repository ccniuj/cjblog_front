import EditorBox from '../commons/Editor'
import config from 'Config'

export default class extends React.Component {
  constructor() {
    super();
    this.state = { title: '' }
    this.handleSubmit = (text) => this._handleSubmit(text)
    this.handleInputChange = (e) => this._handleInputChange(e);
  }
  _handleSubmit(text) {
    var payload = { article: { title: this.state.title, text: text } }
    $.ajax({
      url: config.domain + '/dashboard/articles.json',
      dataType: 'json',
      data: payload,
      type: 'POST',
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