import { test } from './check'

// (String -> void) * String -> object
// Given a code-string, runs a test.
const runTest = (evalFn, codeString) => {
  const result = test('test', () => {
    evalFn('(function () {' + codeString + '})()')
  })

  return result
}

export default runTest
