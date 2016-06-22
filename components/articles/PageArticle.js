import { Link } from 'react-router'
import Disqus from 'react-disqus-thread'
import hljs from 'highlight.js'
import config from 'Config'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { tags: [] } };
    this.load = () => this._load();
    this.getDate = (str) => this._getDate(str);
    this.codeBlockHighlight = () => this._codeBlockHighlight();
    this.renderTags = (article) => this._renderTags(article);
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
      url: config.domain + '/article/' + this.props.params.name + '.json',
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
      <div  className="row">
        <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 article-box'>
          <div className="text-left article-date">
            {this.getDate(this.state.data.created_at)}
          </div>
          <div className='text-right article-tag'>
            {this.renderTags(this.state.data)}
          </div>
          <h2 className="text-capitalize text-center">
            {this.state.data.title}
          </h2>
          <hr />
          <div className='article-content' dangerouslySetInnerHTML={{__html: this.state.data.text}} />
          <Disqus
            shortname="cjcjblog"
            identifier={this.state.data.id}
            url={window.location.href}
            onNewComment={() => console.log('new comment')}/>
        </div>
      </div>
    )
  }
}