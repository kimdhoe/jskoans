import React                   from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <ReactCSSTransitionGroup
          transitionName="routeTransition"
          transitionAppear={true}
          transitionAppearTimeout={700}
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
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
