import { Link } from 'react-router'
// import { stick_footer_to_bottom } from '../../lib/layout.js'
import config from 'Config'

export default React.createClass({
  _getArticles() {
    $.ajax({
      url: config.domain + '/articles.json',
      dataType: 'json',
      success: function(data) {
        this.setState({ data: data });
        // stick_footer_to_bottom(window.footer);
      }.bind(this),
      error: function(xhr) {
      }.bind(this)
    });
  },
  getInitialState() {
    return ({ data: [] })
  },
  componentDidMount() {
    this._getArticles();
  },
  render() {
    return (
      <section className="blog-content">
        <div className="container">
          <div className="row">
            <main className="col-md-9 col-md-push-3" style={{display: 'block'}}>
              { this.state.data.map(function(article) {
                return (
                  <article key={article.id} className="blog-item">
                    <img className="img-responsive center-block" src="" alt="blog-item1" />
                    <div className="blog-heading">
                      <h3 className="text-capitalize">{article.title}</h3>
                      <span className="date">{article.created_at}</span>
                    </div>
                    <p>{article.text}</p>
                    <Link to={'/articles/'+article.id} className="text-capitalize ">
                      繼續閱讀
                      <span><i className="fa fa-angle-double-right" /> </span>
                    </Link>
                  </article>
                )
              }.bind(this))}
              <div className="row">
                <div className="col-md-6 col-md-offset-3 text-center">
                  {/*pagination*/}
                </div>
              </div>
            </main>
            {/* begin sidebar */}
          </div>
        </div>
      </section>
    )
  }
})