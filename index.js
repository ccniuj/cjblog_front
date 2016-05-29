import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import AboutBox   from './components/about/AboutBox'
import ArticleBox from './components/articles/ArticleBox'
import EditorBox  from './components/dashboard/EditorBox'
import Navbar     from './components/commons/Navbar'

import 'bootstrap-webpack!./bootstrap.config.js'
import 'font-awesome-webpack'
import './assets/stylesheets/style.css'
import './assets/stylesheets/draft.css'
import './assets/stylesheets/editor.css'
import './assets/stylesheets/hljs_gist.css'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Navbar}>
      <IndexRoute component={AboutBox} />
      <Route path='/articles' component={ArticleBox} />
      <Route path='/editor' component={EditorBox} />
    </Route>
  </Router>
), document.getElementById('app'))