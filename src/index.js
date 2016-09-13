import React                     from 'react'
import { render }                from 'react-dom'
import { createStore
       , applyMiddleware }       from 'redux'
import { Provider }              from 'react-redux'
import { Router
       , browserHistory
       , applyRouterMiddleware } from 'react-router'
import { useScroll }             from 'react-router-scroll'
import thunkMiddleware           from 'redux-thunk'

import routes                     from './routes'
import reducer                    from './reducer'

const initialState = {
  koans: {
    assert: [
      {
        method: 'equal',
        actualString: '1 + 1',
        actualValue: 2,
        message: 'hahaha'
      }
    ],
    string: [
      {
        method: 'notEqual',
        actualString: '1 + 1',
        actualValue: 2,
        message: 'hahaha'
      }
    ],
    array: [
      {
        method: 'deepEqual',
        actualString: '1 + 1',
        actualValue: 2,
        message: 'hahaha'
      }
    ]
  }
}

const store = createStore( reducer
                         , initialState
                         , applyMiddleware(thunkMiddleware)
                         )

store.subscribe(() => { console.log(store.getState()) })
console.log(store.getState())



render( <Provider store={store}>
          <Router
            history={browserHistory}
            routes={routes}
            render={applyRouterMiddleware(useScroll((prev, curr) => {
              if (prev && prev.location.pathname === curr.location.pathname)
                return false
              return true
            }))}
          />
        </Provider>
      , document.getElementById('app')
      )
