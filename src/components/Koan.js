import React                   from 'react'
import { connect }             from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { assert }              from 'chai'
import Prism                   from 'prismjs'

const makeTestRunner = (koan, expectedString) => {
  const mocha    = new Mocha({ reporter: 'json' })
  const suite    = new Mocha.Suite('Suite')
  const runner   = new Mocha.Runner(suite)
  const reporter = new mocha._reporter(runner)

  const { method, actualValue, message } = koan

  const expectedValue = eval(expectedString)

  // suite.addTest(new Mocha.Test('Test', () => {
  //   if (method === 'assert')
  //     assert(expectedValue, message)
  //   else
  //     assert[method](actualValue, expectedValue, message)
  // }))

  const f = (assert) => {
    eval('assert(false, "hmm what the")')
  }

  suite.addTest(new Mocha.Test('Test', () => {
    f(assert)
  }))

  return runner
}

class Koan extends React.Component {
  static propTypes    = { koan:   React.PropTypes.object.isRequired }
  static contextTypes = { router: React.PropTypes.object.isRequired }

  constructor () {
    super()
    this.state = { expectedString: ''
                 , errorMessage:   ''
                 }
  }

  componentDidMount () {
    this._input.focus()
  }

  onChange (e) {
    this.setState({ expectedString: e.target.value })
  }

  onSubmit (e)  {
    e.preventDefault()

    this.setState({ errorMessage: '' })

    makeTestRunner(this.props.koan, this.state.expectedString)
      .run()
      .on('pass', test => {
        this.setState({ expectedString: '' })

        const { next } = this.props

        if (next)
          this.context.router.push(`/koans/${next.category}/${next.id}`)
      })
      .on('fail', test => {
        this.setState({ errorMessage: test.err.message })
      })
  }

  render() {
    const { method, actualString, message } = this.props.koan
    const { expectedString, errorMessage }  = this.state

    const assertMethod = method === 'assert' ? 'assert' : 'assert'

    const inputWidth = this.state.expectedString.length * 13 > 90
                         ? expectedString.length * 13 + 10
                         : 90

    return (
      <div className="Koan">
        <form onSubmit={this.onSubmit.bind(this)}>
          {method === 'assert'
          ?  <pre
               className="Koan-codePre"
               dangerouslySetInnerHTML={
                 { __html: Prism.highlight( `assert( `
                                          , Prism.languages.javascript
                                          )
                 }
               }
             />
          :  <pre
               className="Koan-codePre"
               dangerouslySetInnerHTML={
                 { __html: Prism.highlight( `assert.${method}( ${actualString}, `
                                          , Prism.languages.javascript
                                          )
                 }
               }
             />
          }

          <input
            className="Koan-input"
            ref={x => this._input = x}
            type="text"
            value={this.state.expectedString}
            style={{width: `${inputWidth}px`}}
            onChange={this.onChange.bind(this)}
          />

          <pre
            className="Koan-codePost"
            dangerouslySetInnerHTML={
              { __html: Prism.highlight( `, '${message}' )`
                                       , Prism.languages.javascript
                                       )
              }
            }
          />

          <input className="Koan-button" type="submit" value="go" />
        </form>

        {errorMessage &&
          <ReactCSSTransitionGroup
              transitionName="errorBox"
              transitionAppear={true}
              transitionAppearTimeout={600}
              transitionEnterTimeout={600}
              transitionLeaveTimeout={600}
            >
            <div className="Koan-errorBox">
              <p className="Koan-encourage">
                <code>// </code>깨달음의 길은 멀고도 험한 법입니다.
              </p>
              <p className="Koan-testMessage">
                {message}
              </p>
              <pre className="Koan-errorMessage">
                {errorMessage}
              </pre>
            </div>
          </ReactCSSTransitionGroup>
        }
      </div>
    )
  }
}

export default Koan
