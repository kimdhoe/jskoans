import React     from 'react'
import map       from 'ramda/src/map'
import find      from 'lodash/find'
import findIndex from 'lodash/findIndex'

import KOANS    from '../koans/koans'
import NotFound from './NotFound'
import KoanNav  from './KoanNav'
import Koan     from './Koan'

const CATEGORIES = map(x => x.category, KOANS)

const getKoan = (category, id) => {
  const currentCategoryIndex = findIndex(KOANS, { category })
  const currentCategory      = KOANS[currentCategoryIndex]
  const meditation           = currentCategory.meditations[id]

  const isOver          =    !KOANS[currentCategoryIndex + 1]
                          && !currentCategory.meditations[Number(id) + 1]
  const isCategoryEnded = !currentCategory.meditations[Number(id) + 1]

  const next =
    isOver
      ? {}
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
        <KoanNav currentCategory={category} categories={CATEGORIES} />

        <Koan meditation={meditation} next={next} />
      </div>
    )
  }
}

export default KoanPage
