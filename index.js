import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import PageAbout from './components/pages/PageAbout'
import 'bootstrap-webpack'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={PageAbout} />
  </Router>
), document.getElementById('app'))