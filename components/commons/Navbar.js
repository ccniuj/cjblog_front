import { Link } from 'react-router'

export default React.createClass({
  componentDidMount() {
    window.footer = this.refs.footer;
  },
  componentDidUpdate() {
  },
  render() {
    return (
      <div ref='main'>
        <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">邁向奇點</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Link className='navbar-link' to="/">關於</Link></li>
                <li><Link className='navbar-link' to="/articles">文章</Link></li>
                <li><Link className='navbar-link navbar-link-last' to="/projects">專案</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='container-fluid' style={{marginTop: '50px'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
})