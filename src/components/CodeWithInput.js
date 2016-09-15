import React from 'react'

import Code  from './Code'

class CodeWithInput extends React.Component {
  static propTypes = { code:        React.PropTypes.string.isRequired
                     , answer:      React.PropTypes.string.isRequired
                     , justFailed:  React.PropTypes.bool.isRequired
                     , handleInput: React.PropTypes.func.isRequired
                     }

  onChange (e) {
    this.props.handleInput(e.target.value)
  }

  componentDidMount () {
    this._input.focus()
  }

  render () {
    const { code, answer }     = this.props
    const [ preInput, postInput ] = code.split(/___+/)
    const inputWidth              = answer.length > 6
                                      ? answer.length * 13
                                      : 90

    return (
      <div className="Koan-inputLine">
        <Code htmlString={preInput} isInline={true} />

        <input
          className={`Koan-input ${this.props.justFailed ? "is-shaking" : ""}`}
          type="text"
          style={{width: `${inputWidth}px`}}
          ref={x => { this._input = x }}
          value={this.props.answer}
          onChange={this.onChange.bind(this)}
        />

        <Code htmlString={postInput} isInline={true} />
      </div>
    )
  }
}

export default CodeWithInput
