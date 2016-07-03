import { Link } from 'react-router'
import hljs from 'highlight.js'
import config from 'Config'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.load = () => this._load();
    this.getDate = (str) => this._getDate(str);
    this.codeBlockHighlight = () => this._codeBlockHighlight();
    this.renderArticle = () => this._renderArticle();
    this.renderTags = (article) => this._renderTags(article)
  }
  componentDidMount() {
    this.load();
    hljs.configure({
      languages: ['ruby', 'python']
    })
  }
  componentDidUpdate() {
    this.codeBlockHighlight()
  }
  _getDate(str) {
    var date = new Date(str);
    var result = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
    return result
  }
  _load() {
    $.ajax({
      url: config.domain + '/articles.json',
      dataType: 'json',
      xhrFields: { withCredentials: true },
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr) {
      }.bind(this)
    });
  }
  _codeBlockHighlight() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }
  _renderArticle() {
    var articles = this.state.data.map((article) => {
      return (
        <div key={article.id} className="row">
          <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 article-box'>
            <div className="text-left article-date">
              {this.getDate(article.created_at)}
            </div>
            <div className='text-right article-tag'>
              {this.renderTags(article)}
            </div>
            <h2 className="text-capitalize text-center">
              {article.title}
            </h2>
            <hr />
            <div dangerouslySetInnerHTML={{__html: article.text}} />
            <div className="article-readmore">
              <Link to={'/articles/'+article.name}>繼續閱讀</Link>
            </div>
          </div>
        </div>
      )
    })
    return articles
  }
  _renderTags(article) {
    var tags = article.tags.map((tag) => {
      return (
        <span key={tag.id}>
          <i className="fa fa-hashtag" aria-hidden="true">{tag.title}</i>&nbsp;&nbsp;
        </span>
      )
    })
    return tags
  }
  render() {
    return (
      <div>
        { this.renderArticle() }
      </div>
    )
  }
}