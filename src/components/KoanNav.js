import React     from  'react'
import { Link }  from 'react-router'

const KoanNav = ({ currentCategory, categories }) =>
  <div className="KoanNav">
    {categories.map(category =>
      category === currentCategory
        ? <span key={category} className="KoanNav-current">
            {category}
          </span>
        : <Link key={category} to={`/${category}/0`} className="KoanNav-link">
            {category}
          </Link>
    )}
  </div>

export default KoanNav
