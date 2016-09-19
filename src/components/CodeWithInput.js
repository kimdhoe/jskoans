import React from 'react'

import { FILL_ME_IN_REGEX } from '../constants'
import Code                 from './Code'

class CodeWithInput extends React.Component {
  static propTypes = { code:        React.PropTypes.string.isRequired
                     , answer:      React.PropTypes.string.isRequired
                     , justFailed:  React.PropTypes.bool.isRequired
                     , index:       React.PropTypes.number.isRequired
                     , handleInput: React.PropTypes.func.isRequired
                     }

  onChange (e) {
    this.props.handleInput(e.target.value, e.target.name)
  }

  componentWillMount () {
    const { code, handleInput } = this.props

    // Render the default answer in input field, if present.
    const defaultAnswer = code.match(FILL_ME_IN_REGEX)[0]
                            .replace(/_/g, '')

    if (defaultAnswer)
      this.props.handleInput(defaultAnswer, this.props.index)
  }

  componentDidMount () {
    this.props.index === 0 && this._input.focus()
  }

  render () {
    const { code, answer }        = this.props
    const [ preInput, postInput ] = code.split(FILL_ME_IN_REGEX)
    const inputWidth              = answer.length > 6
                                      ? answer.length * 13
                                      : 90

    return (
      <div className="Koan-inputLine">
        <Code text={preInput} isInline={true} />

        <input
          className={`Koan-input ${this.props.justFailed ? "is-shaking" : ""}`}
          type="text"
          name={this.props.index}
          style={{width: `${inputWidth}px`}}
          ref={x => { this._input = x }}
          value={this.props.answer}
          onChange={this.onChange.bind(this)}
        />

        <Code text={postInput} isInline={true} />
      </div>
    )
  }
}

export default CodeWithInput
