import React from 'react'

const Desc = ({ description }) =>
  <div className="Koan-description">
    {description.map((x, i) =>
      <p key={i}>
        {x}
      </p>
    )}
  </div>

export default Desc
