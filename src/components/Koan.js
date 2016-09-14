import React                   from 'react'
import { connect }             from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { assert }              from 'chai'
import Prism                   from 'prismjs'
// import findIndex               from 'lodash/findIndex'
import findIndex from 'ramda/src/findIndex'
import makeIframe from '../util/makeIframe'
import runTest    from '../util/runTest'
import Desc from './Desc'
import Code from './Code'

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

    const iframe        = makeIframe(document, { assert })
    const ieval         = iframe.contentWindow.eval
    const { koan }      = this.props
    const { userInput } = this.state
    const codeString    = userInput ? koan.code.replace(/___+/, userInput)
                                    : koan.code.replace(/___+/, '빈_칸')

    runTest(ieval, codeString)
      .on('pass', this.handlePass.bind(this))
      .on('fail', this.handleFail.bind(this))

    document.body.removeChild(iframe)
  }

  handlePass () {
    this.setState({ userInput: '' })

    const { next } = this.props

    if (next)
      this.context.router.push(`/${next.category}/${next.id}`)
    else
      console.log('No more koans. What should I do?')
  }

  handleFail (result) {
    this.setState({ errorMessage: result.err.message })
  }

  render() {
    const lines = this.props.koan.code.split(/\n+/)
    const inputLineIndex = findIndex( x => x.match(/___+/)
                                    , lines
                                    )
    const preInputLine   = lines.slice(0, inputLineIndex)
    const inputLine      = lines[inputLineIndex]
    const postInputLine  = lines.slice(inputLineIndex + 1)

    const [ preInput, postInput ] = inputLine.split(/___+/)

    const { userInput, errorMessage }  = this.state

    const inputWidth = userInput.length > 6 ? userInput.length * 13 : 90

    return (
      <div className="Koan">
        <Desc description={this.props.koan.description} />

        <form className="Koan-body" onSubmit={this.onSubmit.bind(this)}>
          <Code htmlString={Prism.highlight( preInputLine.join('\n')
                                           , Prism.languages.javascript
                                           )
                           }
          />

          <Code
            htmlString={Prism.highlight( preInput
                                       , Prism.languages.javascript
                                       )
                       }
            isInline={true}
          />

          <input
            className="Koan-input"
            type="text"
            ref={x => { this._input = x }}
            value={userInput}
            style={{width: `${inputWidth}px`}}
            onChange={this.onChange.bind(this)}
          />

          <Code
            htmlString={Prism.highlight( postInput
                                       , Prism.languages.javascript
                                       )
                       }
            isInline={true}
          />

          <Code
            htmlString={Prism.highlight( postInputLine.join('\n')
                                       , Prism.languages.javascript
                                       )
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
