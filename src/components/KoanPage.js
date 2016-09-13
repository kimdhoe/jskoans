import React     from 'react'
import find      from 'lodash/find'
import findIndex from 'lodash/findIndex'

import KOANS from '../koans/koans'
import Koan  from './Koan'

const getKoan = (category, id) => {
  const currentCategory      = find(KOANS, { category })
  const currentCategoryIndex = findIndex(KOANS, { category })
  const koan                 = currentCategory.meditations[id]

  const isOver          =    !KOANS[currentCategoryIndex + 1]
                          && !currentCategory.meditations[Number(id) + 1]
  const isCategoryEnded = !currentCategory.meditations[Number(id) + 1]

  const next =
    isOver
      ? null
      : { category: isCategoryEnded ? KOANS[currentCategoryIndex + 1].category
                                    : category
        , id:       isCategoryEnded ? 0
                                    : Number(id) + 1
        }

  return { koan, next }
}

class KoanPage extends React.Component {
  render() {
    const { category, id } = this.props.params
    const { koan, next }   = getKoan(category, id)

    return (
      <div className="KoanPage">
        <Koan koan={koan} next={next} />
      </div>
    )
  }
}

export default KoanPage
