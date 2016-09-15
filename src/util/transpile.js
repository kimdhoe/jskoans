import { transform } from 'babel-standalone'

const transpile = code =>
  transform(code, { presets: [ 'es2015', 'stage-1' ] }).code

export default transpile
