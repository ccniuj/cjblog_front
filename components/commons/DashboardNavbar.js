import { Link, browserHistory } from 'react-router'
import config from 'Config'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: { id: '', username: '' } }
    this.getCurrentUser = () => this._getCurrentUser();
    this.handleLogout = (e) => this._handleLogout(e);
  }
  _getCurrentUser() {
    $.ajax({
      url: config.domain + '/dashboard/get_current_user.json',
      dataType: 'json',
      xhrFields: { withCredentials: true }
    }).
    done(function(data) {
      this.setState({ currentUser: data })
    }.bind(this)).
    fail(function(xhr) {
      console.log(xhr)
    }.bind(this))
  }
  _handleLogout(e) {
    e.preventDefault();
    $.ajax({
      url: config.domain + '/dashboard/sign_out.json',
      dataType: 'json',
      type: 'DELETE',
      xhrFields: { withCredentials: true }
    }).
    done(function(data) {
      browserHistory.push('/')
    }).
    fail(function(xhr) {
      console.log(xhr);
    })
  }
  componentDidMount() {
    this.getCurrentUser()
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="#">邁向奇點</a>
            </div>
            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to='/dashboard/articles'>文章</Link></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.currentUser.username} <span className="caret" /></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li role="separator" className="divider" />
                    <li><a href="#" onClick={this.handleLogout}>登出</a></li>
                  </ul>
                </li>
              </ul>
            </div>{/* /.navbar-collapse */}
          </div>{/* /.container-fluid */}
        </nav>
        <div className='container-fluid' style={{marginTop: '50px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}