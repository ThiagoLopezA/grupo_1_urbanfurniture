import React, { useEffect, useState } from 'react'

export default function CategoriesList() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch("/products")
        .then(response => response.json())
        .then(categories => setCategories(categories.categories))
    }, [])
  return (
    <div className='list__body'>
        {categories.map((e,i) => {
            return <h2 key={e+i} className='category'>{e.nombre}({e.products})</h2>
        })}
        
    </div>
  )
}
