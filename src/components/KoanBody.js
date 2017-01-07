import React from 'react'

import Code          from './Code'
import CodeWithInput from './CodeWithInput'

const KoanBody = ({ code, answers, justFailed, handleInput, onSubmit }) => {
  // state - Index number of the next input field.
  let inputIndex = 0

  const codes = code.map(
    (line, i) => line.hasInputField
                   ? <CodeWithInput
                       key={i}
                       index={inputIndex}
                       code={line.text}
                       answer={answers[inputIndex++] || ''}
                       justFailed={justFailed}
                       handleInput={handleInput}
                     />
                   : <Code key={i} text={line.text} />
  )

  return (
    <div className="Koan-body">
      <form className="Koan-codes" onSubmit={onSubmit}>
        <div>
          {codes}
        </div>

        <input
          className="Koan-button visuallyHidden"
          type="submit"
          value="go"
        />
      </form>
    </div>
  )
}

KoanBody.propTypes = { code:        React.PropTypes.array.isRequired
                     , answers:     React.PropTypes.object.isRequired
                     , justFailed:  React.PropTypes.bool.isRequired
                     , handleInput: React.PropTypes.func.isRequired
                     , onSubmit:    React.PropTypes.func.isRequired
                     }

export default KoanBody
