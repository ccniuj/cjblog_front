import EditorBox from '../commons/Editor'
import config from 'Config'

export default class TagForm extends React.Component {
  constructor() {
    super();
    this.state = { 
      url: '',
      metod: '', 
      name: '', 
      title: ''
    }
    this.load = () => this._load();
    this.handleSubmit = (e) => this._handleSubmit(e)
    this.handleInputChange = (e) => this._handleInputChange(e);
  }
  componentDidMount() {
    if(this.props.params.action=='new') {
      this.setState({
        url: config.domain + '/dashboard/tags.json',
        method: 'POST'
      })
    } else {
      this.setState({
        url: config.domain + '/dashboard/tags/' + this.props.params.id +  '.json',
        method: 'PUT'
      }, () => this.load())
    }
  }
  _load() {
    $.ajax({
      url: this.state.url,
      dataType: 'json',
      xhrFields: { withCredentials: true }
    }).
    done((data) => this.setState({ name: data.name, title: data.title }))
  }
  _handleSubmit(e) {
    e.preventDefault();
    var payload = { 
      tag: { 
        name:  this.state.name,
        title:  this.state.title,
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
        <br/>
        <input type='button' value='儲存' onClick={this.handleSubmit} />
      </div>
    )
  }
}