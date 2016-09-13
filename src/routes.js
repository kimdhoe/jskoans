import React          from 'react'
import { Route
       , IndexRoute } from 'react-router'

import App           from './components/App'
import KoanContainer from './containers/KoanContainer'

const routes =
  <Route path="/" component={App}>
    <Route path="koans/:category/:id" component={KoanContainer} />
  </Route>

export default routes
