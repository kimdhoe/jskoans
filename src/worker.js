import { test, check } from './util/check'

const runTest = code => {
  const f = check => eval(code)

  return test('test', () => f(check))
}

addEventListener('message', ({ data }) => {
  postMessage(runTest(data))
})
