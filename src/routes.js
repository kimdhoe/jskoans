import React          from 'react'
import { Route
       , IndexRoute } from 'react-router'

import App      from './components/App'
import KoanPage from './components/KoanPage'

const routes =
  <Route path="/" component={App}>
    <Route path="koans/:category/:id" component={KoanPage} />
  </Route>

export default routes
