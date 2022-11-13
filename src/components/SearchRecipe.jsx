import React from 'react'
import {useState} from 'react';


function SearchRecipe(props) {

  const [searchItem, setSearchItem] = useState("")

  const handleChange = (event) => {
      setSearchItem(event.target.value)

      props.listToFilter(event.target.value)
  }

  return (
    <div>

      <hr/>
      <label>Search:</label>
      <input value={searchItem} type="text" onChange={handleChange} />

    

    </div>
  )
}

export default SearchRecipe