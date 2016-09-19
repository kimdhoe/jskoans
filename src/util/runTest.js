// (String -> void) * String -> Object
// Runs Mocha test on codeString using evalFn, and returns the result.
const runTest = (evalFn, codeString) => {
  const mocha    = new Mocha({ reporter: 'json' })
  const suite    = new Mocha.Suite('Suite')
  const runner   = new Mocha.Runner(suite)
  const reporter = new mocha._reporter(runner)

  suite.addTest(new Mocha.Test('Test', () => {
    evalFn('(function () {' + codeString + '})()')
  }))

  return runner.run()
}

export default runTest
