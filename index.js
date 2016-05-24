import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import AboutBox   from './components/about/AboutBox'
import ContactBox from './components/contact/ContactBox'
import Navbar     from './components/commons/Navbar'

import 'bootstrap-webpack'
import './assets/stylesheets/font-awesome.min.css'
import './assets/stylesheets/animate.css'
import './assets/stylesheets/owl.carousel.css'
import './assets/stylesheets/owl.theme.css'
import './assets/stylesheets/style.css'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Navbar}>
      <Route path='/about' component={AboutBox} />
      <Route path='/contact' component={ContactBox} />
    </Route>
  </Router>
), document.getElementById('app'))