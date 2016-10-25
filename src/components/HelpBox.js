import React from 'react'

const HelpBox = ({ failMessage, encourage, notice, error }) =>
  <div className={`HelpBox ${error.message ? "HelpBox--error" : ""}`}>
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

    {error.message &&
      <pre className="HelpBox-errorMessage">
        {error.name}: {error.message}
      </pre>
    }

    {notice &&
      <p className="HelpBox-notice">
        {notice}
      </p>
    }
  </div>

HelpBox.propTypes = { failMessage: React.PropTypes.string
                    , encourage:   React.PropTypes.string
                    , notice:      React.PropTypes.string
                    , error:       React.PropTypes.object
                    }

export default HelpBox
