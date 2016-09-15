import React    from 'react'
import { Link } from 'react-router'

const Category = ({ category }) =>
  <div className="Toc-category">
    <h3 className="Toc-categoryName">{category.category}</h3>

    <ul className="Toc-meditationList">
      {category.meditations.map((_, i) =>
        <li key={i} className="Toc-meditation">
          <Link to={`/${category.category}/${i}`}> {i} </Link>
        </li>
      )}
    </ul>
  </div>

Category.propTypes = { category: React.PropTypes.object.isRequired }

export default Category
