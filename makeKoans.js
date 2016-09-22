const fs   = require('fs')
const path = require('path')
const R    = require('ramda')

// type DB         = Array<Category>
//
// type Category   = { category:    string
//                   , meditations: Array<Meditation>
//                   }
//
// type Meditation = { description: Array<string>
//                   , code:        Array<CodeLine>
//                   }
//
// type CodeLine =  { hasInputField: boolean
//                  , text:          string
//                  }

const SEP_REGEX = /\/\/ *SEP/
const KOANS_DIR = './src/koans/'
const FILENAMES = [ 'assert'
                  , 'truthiness'
                  , 'equality'
                  , 'object'
                  , 'array'
                  ]

// string -> string
// Removes two leading slashes.
const uncomment = R.replace(/^\/\/ */, '')

// string -> boolean
// Does str starts with two slashes?
const isCommentLine = R.test(/^ *\/\//)

// string -> CodeLine
// Produces a code-line.
// Assume text contains no newline characters.
const mkCodeLine = text => (
  { hasInputField: R.test(/___+/, text)
  , text
  }
)

// Array<string> -> Array<String>
// Extracts description part from a given array of meditation strings.
const getDescriptionLines =
  R.compose(R.map(uncomment), R.takeWhile(isCommentLine))

// Array<string> -> string
// Extracts code part from a given array of meditation strings.
const getCodeLines =
  R.compose(R.map(mkCodeLine), R.dropWhile(isCommentLine))

// string -> Meditation
// Given a string, produces a medidation.
const mkMeditation = str => {
  const lines = R.split('\n', R.trim(str))

  return { description: getDescriptionLines(lines)
         , code:        getCodeLines(lines)
         }
}

// string * string -> Category
// Given a name and a contents, produces a category.
const mkCategory = (name, contents) => (
  { category:    name
  , meditations: R.map(mkMeditation, R.split(SEP_REGEX, contents))
  }
)

// -> DB
// Produces koans data from the text files in KOANS_DIR.
const mkDb = () => {
  const step = (acc, filename) =>
    [ ...acc
    , mkCategory( filename
                , fs.readFileSync(path.join(KOANS_DIR, filename), 'utf8')
                )
    ]

  return R.reduce(step, [], FILENAMES)
}

const db = mkDb()

// Make a file that exports koans data.
fs.writeFileSync( path.join(KOANS_DIR, 'koans.js')
                ,   '/**\n'
                  + ' * This file was auto-generated by makeKoans.js script.\n'
                  + ' */\n'
                  + 'module.exports = '
                  + JSON.stringify(db)
                )
