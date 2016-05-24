import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div id="multiple-blog-page">
        <nav id="mainNavigation" className="navbar navbar-fixed-top navbar-dafault main-navigation" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              {/* navbar logo */}
              <div className="navbar-brand" id="nav-logo">
                <Link to='/'>邁向奇點</Link>
              </div>
              {/* navbar logo */}
            </div>{/* /.navbar-header */}
            {/* nav links */}
            <div className="collapse navbar-collapse" id="main-nav-collapse">
              <ul className="nav navbar-nav navbar-right text-uppercase">
                <li>
                  <Link to='/'><span>關於我</span></Link>
                </li>
                <li>
                  <Link to='/portfolios'><span>作品</span></Link>
                </li>
                <li>
                  <Link to='/articles'><span>文章</span></Link>
                </li>
                <li>
                  <Link to='/contact'><span>聯絡</span></Link>
                </li>
              </ul>
            </div>{/* nav links */}
          </div>{/* /.container */}
        </nav>
        <header className="page-head">
          <div className="header-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ol className="breadcrumb">
                    <li><a href="#">blog</a></li>
                    <li className="active">multiple blog</li>
                  </ol> {/* end of /.breadcrumb */}
                </div>
              </div>
            </div> {/* /.container */}
          </div> {/* /.header-wrapper */}
        </header> {/* /.page-head (header end) */}
        {this.props.children}
      </div>
    );
  }
});