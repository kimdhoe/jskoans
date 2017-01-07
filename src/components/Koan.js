import React   from 'react'
import isEmpty from 'ramda/src/isEmpty'

// import transpile     from '../util/transpile'
import withFadeSlide from '../util/withFadeSlide'
import fillIn        from '../util/fillIn'
import encourage     from '../util/encourage'
import aphorism      from '../util/aphorism'
import KoanDesc      from './KoanDesc'
import KoanBody      from './KoanBody'
import KoanHelp      from './KoanHelp'
import GoNext        from './GoNext'

import EvalWorker from 'worker!../worker.js'

const AnimatedHelp = withFadeSlide(KoanHelp)
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
                 , animationKey:   true   // Toggles on submit
                 , justFailed:     false  // For animation on test fail
                 , hasFinished:    false  // Has a user passed the last koan?
                 , error:          null   // Test result
                 , gotRightAnswer: false
                 , aphorism:       ''     // Show random saying on test pass
                 }

    // Set up a worker for test evaluations.
    this.resolve = null
    this.worker  = new EvalWorker()
    this.worker.addEventListener('message', e => {
      this.resolve(e.data)
      this.resolve = null
    })

    this.handleCtrlReturn = this.handleCtrlReturn.bind(this)
    this.handleInput      = this.handleInput.bind(this)
    this.onSubmit         = this.onSubmit.bind(this)
    this.goNext           = this.goNext.bind(this)
    this.runTest          = this.runTest.bind(this)
    this.hasBlankAnswer   = this.hasBlankAnswer.bind(this)
  }

  componentWillUnmount () {
    this.worker.terminate()
  }

  // -> void
  // Transitions to the next meditation if there is one.
  goNext () {
    if (this.state.gotRightAnswer) {
      window.removeEventListener('keydown', this.handleCtrlReturn)
    }

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
                  , attempts:       0
                  , gotRightAnswer: true
                  , aphorism:       aphorism()
                  , hasFinished:    isEmpty(this.props.next)
                  }
                 )
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
                  , name: Date()
                  }
                 )
  }

  // -> object
  // Is there any unanswered field? If there is, produces an blank-error object.
  hasBlankAnswer () {
    const keys = Object.keys(this.state.answers)

    if (  keys.length === 0
       || keys.some(k => this.state.answers[k].trim() === '')
       )
      return ({ err: { name:    'BlankError'
                     , message: '빈 칸을 채워주세요.'
                     }
              }
             )
  }

  // string -> Promise<object>
  // Given test codes, produces a promise of a test result.
  // Effect: Sets this.resolve to resolve function of the promise executor.
  runTest (code) {
    return new Promise((resolve, reject) => {
      this.resolve = resolve

      this.worker.postMessage(code)
    })
  }

  onSubmit (e)  {
    e.preventDefault()

    this.setState({ error:          null
                  , hasFinished:    false
                  , gotRightAnswer: false
                  , animationKey:   !this.state.animationKey
                  }
                 )

    const blankError = this.hasBlankAnswer()

    if (blankError)
      return this.handleFail(blankError)

    const codeString =
      fillIn(this.props.meditation.code, this.state.answers) + '\n'
      // transpile(fillIn(this.props.meditation.code, this.state.answers)) + '\n'

    this.runTest(codeString)
      .then(result => {
        if (result.failed) this.handleFail(result)
        else               this.handlePass()
      })
      .catch(err => console.error(err))
  }

  render() {
    const { description, code } = this.props.meditation

    return (
      <div className="Koan">
        <KoanDesc description={description} />

        <KoanBody
          code={code}
          answers={this.state.answers}
          justFailed={this.state.justFailed}
          handleInput={this.handleInput}
          onSubmit={this.onSubmit}
        />

        {!this.state.hasFinished && this.state.aphorism &&
          <div className="Koan-next">
            <AnimatedGoNext onClick={this.goNext} />
          </div>
        }

        <div className="Koan-help">
          <AnimatedHelp
            hasFinished={this.state.hasFinished}
            aphorism={this.state.aphorism}
            encourage={encourage(this.state.attempts)}
            error={this.state.error}
            key={String(this.state.animationKey) + String(this.state.attempts)}
          />
        </div>
      </div>
    )
  }
}

export default Koan
