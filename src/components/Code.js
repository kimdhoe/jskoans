import React from 'react'

const Code = ({ htmlString, isInline = false }) =>
  <pre
    className={`Code ${isInline ? "Code--inline" : "Code--block"}`}
    dangerouslySetInnerHTML={{ __html: htmlString }}
  />

export default Code
