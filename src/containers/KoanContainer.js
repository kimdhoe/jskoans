import { connect } from 'react-redux'
import find        from 'lodash/find'
import findIndex   from 'lodash/findIndex'

import KOANS from '../koans'
import Koan  from '../components/Koan'

const mapStateToProps = (state, { params: { category, id } }) => {
  const currentCategory      = find(KOANS, { category })
  const currentCategoryIndex = findIndex(KOANS, { category })
  const currentKoan          = currentCategory.koans[id]

  const isOver          = !KOANS[currentCategoryIndex + 1]
                       && !currentCategory.koans[Number(id) + 1]
  const isCategoryEnded = !currentCategory.koans[Number(id) + 1]

  return { koan: currentKoan
         , next: isOver
                   ? null
                   : { category: isCategoryEnded
                                   ? KOANS[currentCategoryIndex + 1].category
                                   : category
                     , id:       isCategoryEnded ? 0 : Number(id) + 1
                     }
         }
}

export default connect(mapStateToProps)(Koan)
