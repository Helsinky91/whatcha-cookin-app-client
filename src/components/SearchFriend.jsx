import React from 'react'
import { useState } from 'react';


function SearchFriend(props) {

  const [searchItem, setSearchItem] = useState("")

  const handleChange = (event) => {
    setSearchItem(event.target.value)
    props.filterList(event.target.value)
  }

  return (
    <div>
      <div className="ingredientForm mb-3">
        <input className="shadow p-3 mb-5 bg-body rounded" value={searchItem} type="text" onChange={handleChange} placeholder="Introduce un nombre" />
      </div>
      <hr />
    </div>
  )
}

export default SearchFriend