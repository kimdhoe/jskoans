import React          from 'react'
import { Route
       , IndexRoute } from 'react-router'

import App       from './components/App'
import Greetings from './components/Greetings'
import KoanPage  from './components/KoanPage'
import NotFound  from './components/NotFound'

const routes =
  <Route path="/" component={App}>
    <IndexRoute                 component={Greetings} />
    <Route path=":category/:id" component={KoanPage} />
    <Route path="*"             component={NotFound} />
  </Route>

export default routes
