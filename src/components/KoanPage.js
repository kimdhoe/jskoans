import React     from 'react'
import find      from 'lodash/find'
import findIndex from 'lodash/findIndex'

import KOANS    from '../koans/koans'
import NotFound from './NotFound'
import Koan     from './Koan'

const getKoan = (category, id) => {
  const currentCategory      = find(KOANS, { category })
  const currentCategoryIndex = findIndex(KOANS, { category })
  const meditation           = currentCategory.meditations[id]

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

  return { meditation, next }
}

class KoanPage extends React.Component {
  render() {
    const { category, id }     = this.props.params
    const { meditation, next } = getKoan(category, id)

    if (!meditation)
      return <NotFound />

    return (
      <div className="KoanPage">
        <Koan
          meditation={meditation}
          next={next}
          category={category}
          index={id}
        />
      </div>
    )
  }
}

export default KoanPage
