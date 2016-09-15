import React    from 'react'
import { Link } from 'react-router'

import Toc      from './Toc'

const Greetings = () =>
  <div className="Greetings">
    <p className="Greetings-welcome">Adipisicing fugit et velit nesciunt necessitatibus delectus? Fugit quos explicabo magni accusantium eos minus. Ipsam suscipit assumenda assumenda placeat distinctio Sit debitis vitae perspiciatis error enim Iure nostrum culpa velit</p>

    <Link className="Greetings-startButton" to='/assert/0'>시작</Link>

    <Toc />
  </div>

export default Greetings
