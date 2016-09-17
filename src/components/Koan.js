import React                   from 'react'
import { connect }             from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { assert }              from 'chai'
import map                     from 'ramda/src/map'
import join                    from 'ramda/src/join'
import replace                 from 'ramda/src/replace'
import isEmpty                 from 'ramda/src/isEmpty'
import R from 'ramda'  // !!!

import makeIframe    from '../util/makeIframe'
import runTest       from '../util/runTest'
import transpile     from '../util/transpile'
import encourage     from '../util/encourage'
import withFadeSlide from '../util/withFadeSlide'
import Desc          from './Desc'
import Code          from './Code'
import CodeWithInput from './CodeWithInput'
import HelpBox       from './HelpBox'

import fillIn from '../util/fillIn'

const AnimatedHelpBox = withFadeSlide(HelpBox)

class Koan extends React.Component {
  static propTypes    = { meditation: React.PropTypes.object.isRequired
                        , next:       React.PropTypes.object.isRequired
                        }
  static contextTypes = { router:     React.PropTypes.object.isRequired }

  constructor () {
    super()
    this.state = { answers:       {}
                 , errorMessage: ''
                 , attempts:     0
                 , justFailed:   false
                 , hasFinished:  false
                 }
  }

  handlePass () {
    this.setState({ answers: {} })

    const { next } = this.props

    if (isEmpty(next))
      this.setState({ hasFinished: true })
    else
      this.context.router.push(`/${next.category}/${next.id}`)
  }

  handleFail (result) {
    this.setState({ errorMessage: result.err.message
                  , justFailed:   true
                  , attempts:     this.state.attempts + 1
                  }
                 )
    setTimeout( function () { this.setState({ justFailed: false }) }.bind(this)
              , 200
              )
  }

  handleInput (answer, index) {
    this.setState({ answers: { ...this.state.answers
                            , [index]: answer
                            }
                  }
                 )
    console.log(this.state.answers)
  }

  onSubmit (e)  {
    e.preventDefault()

    this.setState({ errorMessage: '', hasFinished: false })

    const iframe = makeIframe(document, { assert })
    const ieval  = iframe.contentWindow.eval

    const codeString =
      transpile(fillIn(this.props.meditation.code, this.state.answers)) + '\n'

    console.log(codeString)

    runTest(ieval, codeString)
      .on('pass', this.handlePass.bind(this))
      .on('fail', this.handleFail.bind(this))

    document.body.removeChild(iframe)
  }

  render() {
    const { description, code } = this.props.meditation

    // state - Index number of the next input field.
    let nextInputIndex = 0

    const codes = code.map((line, i) => {

      return line.hasInputField
               ? <CodeWithInput
                   key={i}
                   index={nextInputIndex}
                   code={line.text}
                   answer={this.state.answers[nextInputIndex++] || ''}
                   justFailed={this.state.justFailed}
                   handleInput={this.handleInput.bind(this)}
                 />
               : <Code
                   key={i}
                   text={line.text}
                 />
    })

    return (
      <div className="Koan">
        <Desc description={this.props.meditation.description} />

        <div className="Koan-body">
          <form className="Koan-codes" onSubmit={this.onSubmit.bind(this)}>
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

        <div className="Koan-help">
          {this.state.errorMessage &&
            <AnimatedHelpBox
              failMessage="아직 깨달음에 이르지 못했습니다."
              encourage={encourage(this.state.attempts)}
              errorMessage={this.state.errorMessage}
            />
          }

          {this.state.hasFinished &&
            <AnimatedHelpBox
              notice="끝. 앞으로 더 많은 내용이 추가될 예정입니다."
            />
          }
        </div>
      </div>
    )
  }
}

export default Koan
