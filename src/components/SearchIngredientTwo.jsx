import React from 'react'
import { useState } from 'react';

function SearchIngredientTwo(props) {
  const [searchOneIngredient, setSearchOneIngredient] = useState("")

  const handleChange = (event) => {
    setSearchOneIngredient(event.target.value)

    props.filterList(event.target.value)
  }

  return (
    <div className="ingredientForm mb-3">
      <input className="shadow p-3 mb-5 bg-body rounded" value={searchOneIngredient} type="text" onChange={handleChange} placeholder="Segundo ingrediente" />
    </div>
  )
}

export default SearchIngredientTwo