import React from 'react'
import Prism from 'prismjs'

const Code = ({ text, isInline = false }) =>
  <pre
    className={`Code ${isInline ? "Code--inline" : "Code--block"}`}
    dangerouslySetInnerHTML={
      { __html: Prism.highlight( text || ' '
                               , Prism.languages.javascript
                               )
      }
    }
  />

Code.propTypes = { text:     React.PropTypes.string.isRequired
                 , isInline: React.PropTypes.bool
                 }

export default Code
