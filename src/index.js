import React              from 'react'
import { render }         from 'react-dom'
import { createStore }    from 'redux'
import { Provider }       from 'react-redux'
import { Router
       , hashHistory
       , browserHistory } from 'react-router'

import routes from './routes'

import './style/index.scss'

const store = createStore(() => ({}))

render( <Provider store={store}>
          <Router history={hashHistory} routes={routes} />
        </Provider>
      , document.getElementById('app')
      )
