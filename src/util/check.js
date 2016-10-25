import de      from 'deep-equal'
import assert  from 'chai'
import inspect from 'util-inspect'
import josa    from 'josa'

class AssertionError extends Error {
  constructor (message, props) {
    super(message)
    this.message = message
    this.name    = 'AssertionError'
    this.props   = props
  }
}

// Checks if actual is a truthy value.
const isOk = (actual, description) => {
  if (actual) return true

  const message =
    josa(`${inspect(actual)}#{가} 참으로 치는 값일 것으로 예상했습니다.`)

  throw new AssertionError(message, { actual, description })
}

// Checks if actual is a falsey value.
const isNotOk = (actual, description) => {
  if (!actual) return true

  const message =
    josa(`${inspect(actual)}#{가} 거짓으로 치는 값일 것으로 예상했습니다.`)

  throw new AssertionError(message, { actual, description })
}

// Checks if actual is equal to expected, using ==.
const equal = (actual, expected, description) => {
  if (expected == actual) return true

  const message =
    josa(`${inspect(actual)}#{가} ${inspect(expected)}#{와} 같은 값일 것으로 예상했습니다.`)

  throw new AssertionError(message, { actual, expected, description })
}

// Checks if actual is strictly equal to expected, using ===.
const strictEqual = (actual, expected, description) => {
  if (expected === actual) return true

  const message =
    josa(`${inspect(actual)}#{가} ${inspect(expected)}일 것으로 예상했습니다.`)

  throw new AssertionError(message, { actual, expected, description })
}

// Checks if actual is deeply equal to expected.
const deepEqual = (actual, expected, description) => {
  if (de(actual, expected)) return true

  const message =
    josa(`${inspect(actual)}#{가} ${inspect(expected)}#{와} 똑같이 닮은 값일 것으로 예상했습니다.`)

  throw new AssertionError(message, { actual, expected, description })
}

const isTrue = (actual, description) => {
  if (actual === true) return true

  const message =
    josa(`${inspect(actual)}#{가} true일 것으로 예상했습니다.`)

  throw new AssertionError(message, { actual, description })
}

const isFalse = (actual, description) => {
  if (actual === false) return true

  const message =
    josa(`${inspect(actual)}#{가} false일 것으로 예상했습니다.`)

  throw new AssertionError(message, { actual, description })
}

const isArray = (actual, description) => {
  const OBJECT_ARRAY = Object.prototype.toString.call([])

  if (Object.prototype.toString.call(actual) === OBJECT_ARRAY)
    return true

  const message =
    josa(`${inspect(actual)}#{가}  배열(array)일 것으로 예상했습니다.`)

  throw new AssertionError(message, { actual, description })
}

const isObject = (actual, description) => {
  const OBJECT_OBJECT = Object.prototype.toString.call({})

  if (Object.prototype.toString.call(actual) === OBJECT_OBJECT)
    return true

  const message =
    josa(`${inspect(actual)}#{가} 객체(object)일 것으로 예상했습니다.`)

  throw new AssertionError(message, { actual, description })
}

const error = (thunk, constructor, description) => {
  let message = ''

  if (typeof thunk !== 'function') {
    message =
      josa(`${inspect(thunk)}#{가} 함수(function)일 것으로 예상했습니다.`)

    throw new AssertionError(message, { actual: thunk, description })
  }

  try {
    thunk()
  } catch (e) {
    if (!constructor || e instanceof constructor)
      return true

    message =
      josa( `${inspect(thunk)}#{가} ${constructor.name}#{를} 낼 것으로 예상했는데 `
          + `${e.name}#{를} 냈습니다.`
          )

    throw new AssertionError(message, { actual: thunk, description })
  }

  message =
    josa( `${inspect(thunk)}#{가} ${constructor ? constructor.name : '에러'}#{를}`
        + ` 낼 것으로 예상했습니다.`
        )

  throw new AssertionError(message, { actual: thunk, description })
}


// Given a test name and a thunk containing some checks, produces test result.
export const test = (name, fn) => {
  try {
    fn()
  } catch (e) {
    return { failed: true
           , test:   name
           , err:    { ...e.props
                     , message: e.message
                     , name:    e.name
                     }
           }
  }

  return { passed: true }
}

export const check = { isOk
                     , isNotOk
                     , equal
                     , strictEqual
                     , deepEqual
                     , isArray
                     , isObject
                     , isTrue
                     , isFalse
                     , error
                     }
