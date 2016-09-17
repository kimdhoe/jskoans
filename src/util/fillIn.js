import map     from 'ramda/src/map'
import join    from 'ramda/src/join'
import replace from 'ramda/src/replace'

import { FILL_ME_IN_REGEX } from '../constants'

// Array<CodeLine> -> string
// Given a list of codes, produces a code string.
const codeString = loc =>
  join( '\n'
      , map( c => c.text
           , loc
           )
      )

// Array<CodeLine> * object -> string
// Given answers, fills in the blanks in code.
// - answers is an object that has zeo-based index keys and string values.
const fillIn = (loc, answers) => {
  let i = 0

  return replace( FILL_ME_IN_REGEX
                , () => answers[i++] || '빈_칸'
                , codeString(loc)
                )
}

export default fillIn
