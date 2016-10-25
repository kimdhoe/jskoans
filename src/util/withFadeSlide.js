import React                   from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// React.Component -> React.Component
const withFadeSlide = Comp => props =>
  <ReactCSSTransitionGroup
    transitionName="errorBox"
    transitionAppear={true}
    transitionAppearTimeout={600}
    transitionEnterTimeout={600}
    transitionLeaveTimeout={600}
  >
    <Comp {...props} key={props.attempts} />
  </ReactCSSTransitionGroup>

export default withFadeSlide
