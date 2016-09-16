import React from 'react'

const HelpBox = ({ failMessage, errorMessage, encourage, notice }) =>
  <div className={`HelpBox ${errorMessage ? "HelpBox--error" : ""}`}>
    {failMessage &&
      <div className="HelpBox-failMessage">
        <p className="HelpBox-comment">
          스승님 가라사대,
        </p>
        <p className="HelpBox-encourage">
          {failMessage}
          <br />
          {encourage}
        </p>
      </div>
    }

    {errorMessage &&
      <pre className="HelpBox-errorMessage">
        {errorMessage}
      </pre>
    }

    {notice &&
      <p className="HelpBox-notice">
        {notice}
      </p>
    }
  </div>

HelpBox.propTypes = { failMessage:   React.PropTypes.string
                    ,  errorMessage: React.PropTypes.string
                    ,  encourage:    React.PropTypes.string
                    ,  notice:       React.PropTypes.string
                    }

export default HelpBox
