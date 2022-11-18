import React from 'react'
import { useState } from 'react';

function SearchIngredientThree(props) {

  const [searchOneIngredient, setSearchOneIngredient] = useState("")

  const handleChange = (event) => {
    setSearchOneIngredient(event.target.value)
    props.filterList(event.target.value)
  }

  return (
    <div className="ingredientForm">
      <input className="shadow p-3 mb-5 bg-body rounded" value={searchOneIngredient} type="text" onChange={handleChange} placeholder="Tercer ingrediente" />
    </div>
  )
}

export default SearchIngredientThree