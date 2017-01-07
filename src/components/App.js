import React                   from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link }                from 'react-router'

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <header className="Header">
          <h1 className="Header-title">
            <Link to="/"> JS Koans (beta) </Link>
          </h1>
        </header>

        <ReactCSSTransitionGroup
          transitionName="routeTransition"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {React.cloneElement( this.props.children
                             , { key: location.hash }
                             )
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default App
