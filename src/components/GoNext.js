import React from 'react'

const GoNext = ({ onClick }) =>
  <div className="GoNext">
    <button
      className="GoNext-button"
      onClick={onClick}
    >
      다음<br /><span>Ctrl + Return</span>
    </button>
  </div>

GoNext.propTypes = { onClick: React.PropTypes.func.isRequired }

export default GoNext
