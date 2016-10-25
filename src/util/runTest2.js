import { test } from './check'

// (String -> void) * String -> Object
// Runs Mocha test on codeString using evalFn, and returns the result.
const runTest = (evalFn, codeString) => {
  // const mocha    = new Mocha({ reporter: 'json' })
  // const suite    = new Mocha.Suite('Suite')
  // const runner   = new Mocha.Runner(suite)
  // const reporter = new mocha._reporter(runner)

  const result = test('test', () => {
    evalFn('(function () {' + codeString + '})()')
  })

  return result

  // return runner.run()
}

export default runTest
