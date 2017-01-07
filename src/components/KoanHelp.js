import React from 'react'

const KoanHelp = ({ hasFinished, encourage, aphorism, error }) =>
  <div className={`KoanHelp ${error ? "KoanHelp--error" : ""}`}>
    {error &&
      <div className="KoanHelp-failMessage">
        <p className="KoanHelp-comment">
          스승님 가라사대,
        </p>

        <p className="KoanHelp-encourage">
          아직 깨달음에 이르지 못했습니다.
          <br />
          {encourage}
        </p>

        <pre className="KoanHelp-errorMessage">
          {error.name}: {error.message}
        </pre>
      </div>
    }

    {hasFinished &&
      <p className="KoanHelp-notice">
        끝. 앞으로 더 많은 내용이 추가될 예정입니다.
      </p>
    }

    {aphorism &&
      <p className="KoanHelp-saying">
        {aphorism}
      </p>
    }
  </div>

KoanHelp.propTypes = { hasFinished: React.PropTypes.bool
                     , aphorism:    React.PropTypes.string
                     , encourage:   React.PropTypes.string
                     , error:       React.PropTypes.object
                     }

export default KoanHelp
