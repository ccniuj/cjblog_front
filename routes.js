import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import AboutContainer from './containers/AboutContainer'
import ArticlesContainer from './containers/ArticlesContainer'
import Article from './components/Article'
import LoginContainer from './containers/LoginContainer'
import Dashboard from './containers/Dashboard'
import DashboardArticlesContainer from './containers/DashboardArticlesContainer'
import DashboardArticleForm from './containers/DashboardArticleForm'
import DashboardTagsContainer from './containers/DashboardTagsContainer'
import DashboardTagForm from './containers/DashboardTagForm'

export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={AboutContainer} />
      <Route path='articles'>
        <IndexRoute component={ArticlesContainer} />
        <Route path=':name' component={Article}/>
      </Route>
      <Route path='login' component={LoginContainer} />
    </Route>
    <Route path='/dashboard' component={Dashboard}>
      <Route path='articles'>
        <IndexRoute component={DashboardArticlesContainer} />
        <Route path=':type(/:id)' component={DashboardArticleForm} />
      </Route>
      <Route path='tags'>
        <IndexRoute component={DashboardTagsContainer} />
        <Route path=':type(/:id)' component={DashboardTagForm} />
      </Route>
    </Route>
  </Route>
)
