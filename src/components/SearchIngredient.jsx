import React from 'react'
import { useState } from 'react';

function SearchIngredient(props) {

  const [searchOneIngredient, setSearchOneIngredient] = useState("")

  const handleChange = (event) => {
    setSearchOneIngredient(event.target.value)
    props.filterList(event.target.value)
  }


  return (
    <div className="ingredientForm">
      <input className="shadow p-3 mb-5 bg-body rounded" value={searchOneIngredient} id="formFile" type="text" onChange={handleChange} placeholder="Primer ingrediente" />
    </div>

  )
}

export default SearchIngredient