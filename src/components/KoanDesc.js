import React from 'react'

const KoanDesc = ({ description }) =>
  <div className="Koan-description">
    {description.map((x, i) =>
      <p key={i}>
        {x}
      </p>
    )}
  </div>

KoanDesc.propTypes = { description: React.PropTypes.array.isRequired }

export default KoanDesc
