import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getList, clientRender } from '../actions'
import { Link } from 'react-router'
import hljs from 'highlight.js'
import config from '../config'

class ArticlesContainer extends Component {
  static fetchData({ store, cookie }) {
    return store.dispatch(getList('articles', cookie))
  }
  constructor(props) {
    super(props);
    this.getDate = str => this._getDate(str);
    this.codeBlockHighlight = () => this._codeBlockHighlight();
  }
  componentDidMount() {
    if (this.props.serverRender) {
      this.props.clientRender()
    } else {
      this.props.getList('articles')
    }

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
  _codeBlockHighlight() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }
  render() {
    const { articles } = this.props

    return (
      <div>
        {
          articles.map(article => 
            <div key={article.id} className="row">
              <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 article-box'>
                <div className="text-left article-date">
                  {this.getDate(article.created_at)}
                </div>
                <div className='text-right article-tag'>
                  { article.tags.map(tag => 
                      <span key={tag.id}>
                        <i className="fa fa-hashtag" aria-hidden="true">{tag.title}</i>&nbsp;&nbsp;
                      </span>
                    )
                  }
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
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles.list,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getList, clientRender }
)(ArticlesContainer)
