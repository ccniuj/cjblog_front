import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForm, clientRender } from '../actions'
import { Link } from 'react-router'
import Disqus from 'react-disqus-thread'
import hljs from 'highlight.js'
import config from '../config'

class Article extends Component {
  static fetchData({ store, cookie, params }) {
    return store.dispatch(getForm('show', 'articles', params, cookie))
  }
  constructor(props) {
    super(props);
    this.getDate = str => this._getDate(str);
    this.codeBlockHighlight = () => this._codeBlockHighlight();
  }
  componentDidMount() {
    const { 
      params, 
      serverRender, 
      clientRender, 
      getForm } = this.props

    if (serverRender) {
      clientRender()
    } else {
      getForm('show', 'articles', params.name)
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
    const { serverRender, article, params } = this.props

    return (
      <div  className="row">
        <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 article-box'>
          <div className="text-left article-date">
            {this.getDate(article.created_at)}
          </div>
          <div className='text-right article-tag'>
            {
              article.tags 
              ? article.tags.map(tag => 
                  <span key={tag.id}>
                    <i className="fa fa-hashtag" aria-hidden="true">{tag.title}</i>&nbsp;&nbsp;
                  </span>
                )
              : []
            }
          </div>
          <h2 className="text-capitalize text-center">
            {article.title}
          </h2>
          <hr />
          <div className='article-content' dangerouslySetInnerHTML={{__html: article.text}} />
          {
            // !serverRender
            // ? <Disqus
            //     shortname="cjcjblog"
            //     title={article.title}
            //     identifier={article.id+''}
            //     url={`/articles/${params.name}`}
            //     onNewComment={() => console.log('new comment')}/>
            // : <div/>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    article: state.articles.form,
    serverRender: state.serverRender
  }
}

export default connect(
  mapStateToProps,
  { getForm, clientRender }
)(Article)
