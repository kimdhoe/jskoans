import React                   from 'react'
import { connect }             from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { assert }              from 'chai'
import map                     from 'ramda/src/map'
import join                    from 'ramda/src/join'
import replace                 from 'ramda/src/replace'
import isEmpty                 from 'ramda/src/isEmpty'

import makeIframe    from '../util/makeIframe'
import runTest       from '../util/runTest'
import Desc          from './Desc'
import Code          from './Code'
import CodeWithInput from './CodeWithInput'


class Koan extends React.Component {
  static propTypes    = { meditation: React.PropTypes.object.isRequired
                        , next:       React.PropTypes.object.isRequired
                        , category:   React.PropTypes.string.isRequired
                        , index:      React.PropTypes.string.isRequired
                        }
  static contextTypes = { router: React.PropTypes.object.isRequired }

  constructor () {
    super()
    this.state = { answer:       ''
                 , errorMessage: ''
                 , justFailed:   false
                 }
  }

  handlePass () {
    this.setState({ answer: '' })

    const { next } = this.props

    if (isEmpty(next))
      console.log('No more koans. What should I do?')
    else
      this.context.router.push(`/${next.category}/${next.id}`)
  }

  handleFail (result) {
    this.setState({ errorMessage: result.err.message
                  , justFailed:   true
                  }
                 )
    setTimeout( function () { this.setState({ justFailed: false }) }.bind(this)
              , 200
              )
  }

  handleInput (str) {
    this.setState({ answer: str })
  }

  onSubmit (e)  {
    e.preventDefault()

    this.setState({ errorMessage: '' })

    const iframe = makeIframe(document, { assert })
    const ieval  = iframe.contentWindow.eval

    const codeString = replace( /___+/
                              , this.state.answer || '빈_칸'
                              , join( '\n'
                                    , map( x => x.text
                                         , this.props.meditation.code
                                         )
                                    )
                              )

    runTest(ieval, codeString)
      .on('pass', this.handlePass.bind(this))
      .on('fail', this.handleFail.bind(this))

    document.body.removeChild(iframe)
  }

  render() {
    const { description, code } = this.props.meditation

    const codes = code.map((line, i) =>
      line.hasInputField
        ? <CodeWithInput
            key={i}
            code={line.text}
            answer={this.state.answer}
            justFailed={this.state.justFailed}
            handleInput={this.handleInput.bind(this)}
          />
        : <Code
            key={i}
            htmlString={line.text}
          />
    )

    return (
      <div className="Koan">
        <h2 className="Koan-category">
          {this.props.category} {this.props.index}
        </h2>

        <Desc description={this.props.meditation.description} />

        <form className="Koan-body" onSubmit={this.onSubmit.bind(this)}>
          <div>
            {codes}
          </div>

          <input
            className="Koan-button visuallyHidden"
            type="submit"
            value="go"
          />
        </form>

        {this.state.errorMessage &&
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
                  {this.state.errorMessage}
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
