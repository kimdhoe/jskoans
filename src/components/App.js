import React                   from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <ReactCSSTransitionGroup
          transitionName="routeTransition"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={300}
        >
          {React.cloneElement( this.props.children
                             , { key: location.pathname }
                             )
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default App
