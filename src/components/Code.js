import React from 'react'
import Prism from 'prismjs'

const Code = ({ htmlString, isInline = false }) =>
  <pre
    className={`Code ${isInline ? "Code--inline" : "Code--block"}`}
    dangerouslySetInnerHTML={
      { __html: Prism.highlight( htmlString
                               , Prism.languages.javascript
                               )
      }
    }
  />

Code.propTypes = { htmlString: React.PropTypes.string.isRequired
                 , isInline:   React.PropTypes.bool
                 }

export default Code
