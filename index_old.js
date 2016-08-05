import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import ReactGA         from 'react-ga'
import Navbar          from './components/commons/Navbar'
import PageAboutBox    from './components/about/PageAboutBox'
import PageArticleBox  from './components/articles/PageArticleBox'
import PageProjectBox  from './components/projects/PageProjectBox'
import PageArticle     from './components/articles/PageArticle'
import LoginBox        from './components/dashboard/LoginBox'
import DashboardNavbar from './components/commons/DashboardNavbar'
import ArticleBox      from './components/dashboard/ArticleBox'
import ArticleForm     from './components/dashboard/ArticleForm'
import TagBox          from './components/dashboard/TagBox'
import TagForm         from './components/dashboard/TagForm'

import 'bootstrap-webpack!./bootstrap.config.js'
import 'font-awesome-webpack'
import './assets/stylesheets/style.css'
import './assets/stylesheets/draft.css'
import './assets/stylesheets/editor.css'
import './assets/stylesheets/hljs_gist.css'

ReactGA.initialize('UA-79216411-1')

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render((
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route path='/' component={Navbar}>
      <IndexRoute component={PageAboutBox} />
      <Route path='articles'>
        <IndexRoute component={PageArticleBox} />
        <Route path=':name' component={PageArticle}/>
      </Route>
      <Route path='projects'>
        <IndexRoute component={PageProjectBox} />
      </Route>
      <Route path='login' component={LoginBox} />
    </Route>
    <Route path='/dashboard' component={DashboardNavbar}>
      <Route path='articles'>
        <IndexRoute component={ArticleBox} />
        <Route path=':action(/:id)' component={ArticleForm} />
      </Route>
      <Route path='tags'>
        <IndexRoute component={TagBox} />
        <Route path=':action(/:id)' component={TagForm} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))