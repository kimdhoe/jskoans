import React from 'react'

const Test = ({ method, actualString, expectedString, handleChange }) =>
  <div>
    <span>assert.{method}(</span>

    <span>{actualString}, </span>

    <input
      type="text"
      value={expectedString}
      onChange={handleChange}
    />

    <span>)</span>
  </div>

export default Test
