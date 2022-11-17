import React from 'react'
import {useState} from 'react';


function SearchRecipe(props) {

  const [searchItem, setSearchItem] = useState("")

  const handleChange = (event) => {
      setSearchItem(event.target.value)

      props.filterList(event.target.value)
  }

  return (
    <div>
      <input value={searchItem} type="text" onChange={handleChange} placeholder="Busca una receta"/>
    </div>
  )
}

export default SearchRecipe