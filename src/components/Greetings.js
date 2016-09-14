import React    from 'react'
import { Link } from 'react-router'

const Greetings = () =>
  <div className="Greetings">
    <h1 className="Greetings-heading">JavaScript 문답</h1>

    <p className="Greetings-welcome">Adipisicing fugit et velit nesciunt necessitatibus delectus? Fugit quos explicabo magni accusantium eos minus. Ipsam suscipit assumenda assumenda placeat distinctio Sit debitis vitae perspiciatis error enim Iure nostrum culpa velit</p>

    <Link className="Greetings-startButton" to='/assert/0'>시작</Link>
  </div>

export default Greetings
