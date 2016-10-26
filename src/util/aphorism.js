import randomInt from './randomInt'

// aphorism : -> string
// Produces a random aphrism randomly.
const aphorism = () => {
  const list =
    [ '산은 산이요, 물은 물이로다.'
    , 'aaa'
    , 'bbb'
    ]

  return list[randomInt(list.length)]
}

export default aphorism
