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
  }
  componentDidMount() {
    this.load();
    hljs.configure({
      languages: ['ruby']
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
  render() {
    return (
      <div>
        { this.state.data.map(function(article) {
          return (
            <div key={article.id} className="row">
              <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 article-box'>
                <div className="text-left article-date">
                  {this.getDate(article.created_at)}
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
        }.bind(this))}
      </div>
    )
  }
}