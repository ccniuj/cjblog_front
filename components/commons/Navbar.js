import { Link } from 'react-router'
import { stick_footer_to_bottom } from '../../lib/layout.js'

export default React.createClass({
  componentDidMount() {
    window.footer = this.refs.footer;
    stick_footer_to_bottom(window.footer);
  },
  componentDidUpdate() {
    stick_footer_to_bottom(window.footer);
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
        {this.props.children}
        <nav className="footer navbar-inverse" ref='footer'>
          <div className="container-fluid">
            <div className="navbar-header">
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <Link className='footer-link' to="/"><i className="fa fa-copyright" /> CJ</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
})