import React                   from 'react'
import { connect }             from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { assert }              from 'chai'
import Prism                   from 'prismjs'
import findIndex               from 'lodash/findIndex'

class Koan extends React.Component {
  static propTypes    = { koan:   React.PropTypes.object.isRequired }
  static contextTypes = { router: React.PropTypes.object.isRequired }

  constructor () {
    super()
    this.state = { userInput:    ''
                 , errorMessage: ''
                 }
  }

  componentDidMount () {
    this._input.focus()
  }

  onChange (e) {
    this.setState({ userInput: e.target.value })
  }

  onSubmit (e)  {
    e.preventDefault()

    this.setState({ errorMessage: '' })

    const mocha    = new Mocha({ reporter: 'json' })
    const suite    = new Mocha.Suite('Suite')
    const runner   = new Mocha.Runner(suite)
    const reporter = new mocha._reporter(runner)

    const code =  this.state.userInput
      ? this.props.koan.code.replace(/____*/, this.state.userInput)
      : this.props.koan.code.replace(/____*/, 'undefined')

    console.log(code)

    const f = assert => {
      eval(code)
    }

    suite.addTest(new Mocha.Test('Test', () => {
      f(assert)
    }))

    runner
      .run()
      .on('pass', test => {
        this.setState({ userInput: '' })

        const { next } = this.props

        if (next)
          this.context.router.push(`/${next.category}/${next.id}`)
      })
      .on('fail', test => {
        this.setState({ errorMessage: test.err.message })
      })
  }

  render() {
    const lines = this.props.koan.code.split(/\n+/)
    const inputLineIndex = findIndex( lines
                                    , x => x.match(/___+/)
                                    )
    const preLines  = lines.slice(0, inputLineIndex)
    const inputLine = lines[inputLineIndex]
    const postLines = lines.slice(inputLineIndex + 1)

    const [ preInput, postInput ] = inputLine.split(/___+/)

    const { userInput, errorMessage }  = this.state

    const inputWidth = userInput.length > 6 ? userInput.length * 13 : 90

    return (
      <div className="Koan">
        <div className="Koan-description">
          {this.props.koan.description.map((x, i) =>
            <p key={i}>{x}</p>
          )}
        </div>

        <form className="Koan-body" onSubmit={this.onSubmit.bind(this)}>
          <pre
            dangerouslySetInnerHTML={
              { __html: Prism.highlight( preLines.join('\n')
                                       , Prism.languages.javascript
                                       )
              }
            }
          />

          <pre
            className="Koan-codePre"
            dangerouslySetInnerHTML={
              { __html: Prism.highlight( preInput
                                       , Prism.languages.javascript
                                       )
              }
            }
          />

          <input
            className="Koan-input"
            ref={x => this._input = x}
            type="text"
            value={userInput}
            style={{width: `${inputWidth}px`}}
            onChange={this.onChange.bind(this)}
          />

          <pre
            className="Koan-codePost"
            dangerouslySetInnerHTML={
              { __html: Prism.highlight( postInput
                                       , Prism.languages.javascript
                                       )
              }
            }
          />

          <pre
            dangerouslySetInnerHTML={
              { __html: Prism.highlight( postLines.join('\n')
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
            <div className="Koan-errorBoxWrap">
              <div className="Koan-errorBox">
                <p className="Koan-encourage">
                  <code>// </code>깨달음의 길은 멀고도 험한 법입니다.
                </p>
                <pre className="Koan-errorMessage">
                  {errorMessage}
                </pre>
              </div>
            </div>
          </ReactCSSTransitionGroup>
        }
      </div>
    )
  }
}

export default Koan
