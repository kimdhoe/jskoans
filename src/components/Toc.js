import React from 'react'

import koans    from '../koans/koans'
import Category from './Category'

class Toc extends React.Component {
  render() {
    return (
      <div className="Toc">
        {koans.map((category, i) =>
          <Category key={i} category={category} />
        )}
      </div>
    )
  }
}

export default Toc
