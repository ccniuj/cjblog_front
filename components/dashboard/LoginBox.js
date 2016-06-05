import config from 'Config'

export default class extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { email: '',  password: '' }
  }
  handleInputChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: config.domain + '/dashboard/sign_in.json',
      dataType: 'json',
      data: { user: this.state },
      type: 'POST',
      xhrFields: { withCredentials: true }
    }).
    done(function(data) {
      console.log(data);
    }).
    fail(function(xhr) {
      console.log(xhr);
    })
  }
  handleLogout(e) {
    e.preventDefault();
    $.ajax({
      url: config.domain + '/dashboard/sign_out.json',
      dataType: 'json',
      type: 'DELETE',
      xhrFields: { withCredentials: true }
    }).
    done(function(data) {
      console.log(data);
    }).
    fail(function(xhr) {
      console.log(xhr);
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label for='email'>email</label>
          <input type='text' name='email' value={this.state.email} onChange={this.handleInputChange} />
          <br/>
          <label for='password'>password</label>
          <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
          <br/>
          <input type='submit' value='submit' />
        </form>
        <input type='submit' value='logout' onClick={this.handleLogout} />
      </div>
    )
  }
}