import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import AboutBox   from './components/about/AboutBox'
import ArticleBox from './components/articles/ArticleBox'
import EditBox    from './components/commons/Navbar'
import Navbar     from './components/commons/Navbar'

import 'bootstrap-webpack'
import 'font-awesome-webpack'
import './assets/stylesheets/style.css'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Navbar}>
      <IndexRoute component={AboutBox} />
      <Route path='/articles' component={ArticleBox} />
      <Route path='/edit' component={EditBox} />
    </Route>
  </Router>
), document.getElementById('app'))