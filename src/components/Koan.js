import React                   from 'react'
import isEmpty                 from 'ramda/src/isEmpty'

import makeIframe    from '../util/makeIframe'
import runTest       from '../util/runTest2'
import { check }     from '../util/check'
import fillIn        from '../util/fillIn'
// import transpile     from '../util/transpile'
import encourage     from '../util/encourage'
import withFadeSlide from '../util/withFadeSlide'
import Desc          from './Desc'
import Code          from './Code'
import CodeWithInput from './CodeWithInput'
import HelpBox       from './HelpBox'
import GoNext        from './GoNext'
import aphorism      from '../util/aphorism'

const AnimatedHelpBox = withFadeSlide(HelpBox)
const AnimatedGoNext  = withFadeSlide(GoNext)

class Koan extends React.Component {
  static propTypes    = { meditation: React.PropTypes.object.isRequired
                        , next:       React.PropTypes.object.isRequired
                        }
  static contextTypes = { router:     React.PropTypes.object.isRequired }

  constructor () {
    super()
    this.state = { answers:        {}
                 , attempts:       0
                 , justFailed:     false
                 , hasFinished:    false
                 , error:          null
                 , gotRightAnswer: false
                 , aphorism:       ''
                 }
    this.handleCtrlReturn = this.handleCtrlReturn.bind(this)
    this.handleInput      = this.handleInput.bind(this)
    this.onSubmit         = this.onSubmit.bind(this)
    this.goNext           = this.goNext.bind(this)
  }

  goNext () {
    if (this.state.gotRightAnswer) {
      window.removeEventListener('keydown', this.handleCtrlReturn)
    }

    console.log('Go to the next one')

    const { next } = this.props

    if (isEmpty(next))
      this.setState({ hasFinished: true })
    else
      this.context.router.push(`/${next.category}/${next.id}`)
  }

  handleCtrlReturn (e) {
    if (e.ctrlKey && e.keyCode === 13) {
      e.preventDefault()
      this.goNext()
    }
  }

  handlePass () {
    if (!this.state.gotRightAnswer) {
      window.addEventListener('keydown', this.handleCtrlReturn)
    }

    this.setState({ error:          null
                  , gotRightAnswer: true
                  , aphorism:       aphorism()
                  }
                 )

    // this.setState({ answers: {} })

    // const { next } = this.props
    //
    // if (isEmpty(next))
    //   this.setState({ hasFinished: true })
    // else
    //   this.context.router.push(`/${next.category}/${next.id}`)
  }

  handleFail (result) {
    if (this.state.gotRightAnswer) {
      window.removeEventListener('keydown', this.handleCtrlReturn)
    }

    this.setState({ justFailed:     true
                  , attempts:       this.state.attempts + 1
                  , error:          result.err
                  , gotRightAnswer: false
                  , aphorism:       ''
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
  }

  onSubmit (e)  {
    e.preventDefault()

    this.setState({ error: null, hasFinished: false, gotRightAnswer: false })

    const keys = Object.keys(this.state.answers)

    if (  keys.length === 0
       || keys.some(k => this.state.answers[k].trim() === '')
       )
      return this.handleFail({ err: { name:    'BlankError'
                                    , message: '빈 칸을 채워주세요.'
                                    }
                             }
                            )

    const iframe = makeIframe(document, { check })
    const ieval  = iframe.contentWindow.eval

    const codeString =
      fillIn(this.props.meditation.code, this.state.answers) + '\n'
      // transpile(fillIn(this.props.meditation.code, this.state.answers)) + '\n'

    const result = runTest(ieval, codeString)

    if (result.failed)
      this.handleFail(result)
    else
      this.handlePass()

    document.body.removeChild(iframe)
  }

  render() {
    const { description, code } = this.props.meditation

    // state - Index number of the next input field.
    let nextInputIndex = 0

    const codes = code.map((line, i) =>
      line.hasInputField
        ? <CodeWithInput
            key={i}
            index={nextInputIndex}
            code={line.text}
            answer={this.state.answers[nextInputIndex++] || ''}
            justFailed={this.state.justFailed}
            handleInput={this.handleInput}
          />
        : <Code
            key={i}
            text={line.text}
          />
    )

    return (
      <div className="Koan">
        <Desc description={this.props.meditation.description} />

        <div className="Koan-body">
          <form className="Koan-codes" onSubmit={this.onSubmit}>
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
          {this.state.error &&
            <AnimatedHelpBox
              failMessage="아직 깨달음에 이르지 못했습니다."
              encourage={encourage(this.state.attempts)}
              key={this.state.attempts}
              error={this.state.error}
            />
          }

          {this.state.hasFinished &&
            <AnimatedHelpBox
              notice="끝. 앞으로 더 많은 내용이 추가될 예정입니다."
            />
          }
        </div>

        {this.state.aphorism &&
          <AnimatedGoNext onClick={this.goNext} />
        }

        {this.state.gotRightAnswer &&
          <AnimatedHelpBox
            aphorism={this.state.aphorism}
            key={Date()}
          />
        }
      </div>
    )
  }
}

export default Koan
