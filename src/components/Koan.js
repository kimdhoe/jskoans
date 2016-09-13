import React       from 'react'
import { assert }  from 'chai'
import { connect } from 'react-redux'
import Highlight from 'react-highlight'

const { Suite, Runner, Test } = Mocha

class Koan extends React.Component {
  // static propTypes = { koan: React.PropTypes.array.isRequired }

  static contextTypes = { router: React.PropTypes.object.isRequired }

  constructor () {
    super()
    this.state = { expectedString: ''
                 , wasFailed:      false
                 }
  }

  componentDidMount () {
    const el = document.getElementById('here')
    Prism.highlightElement(el)
  }

  onChange (e) {
    this.setState({ expectedString: e.target.value })
  }

  onSubmit (e)  {
    e.preventDefault()

    this.setState({ wasFailed: false })

    const suite  = new Suite('Suite')
    const runner = new Runner(suite)

    const { method, actualValue } = this.props.koan
    const { next }                = this.props

    const expectedValue = eval(this.state.expectedString)

    suite.addTest(new Test('Test', () => {
      assert[method](actualValue, expectedValue)
    }))

    runner.run()
      .on('pass', test => {
        console.log('passed')

        this.setState({ expectedString: '' })

        next && this.context.router.push(`/koans/${next.category}/${next.id}`)
      })
      .on('fail', test => {
        console.log('failed')

        this.setState({ wasFailed: true })
      })
  }

  render() {
    const { method, actualString, message } = this.props.koan

    return (
      <div className="Koan language-javascript">
        <form onSubmit={this.onSubmit.bind(this)}>
          <code className="Koan-highlighted-pre">
            assert.{method}( {actualString}, 
          </code>

          <input
            type="text"
            value={this.state.expectedString}
            onChange={this.onChange.bind(this)}
          />

        <code className="Koan-highlighted-post">
          , '{message}' )
        </code>


          {this.state.wasFailed &&
            <p>꺠달음의 길은 멀고도 험한 법이니라.</p>
          }

          <input className="Koan-button" type="submit" value="go" />
        </form>
      </div>
    )
  }
}

export default Koan
