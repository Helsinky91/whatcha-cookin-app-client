import React from 'react'
import {useState} from 'react';

function SearchIngredient(props) {
  //! mirar lab-react-ironnutrition > App.js
    //1. creamos estado de list + listToShow
    //2. const filterList

    //en IngredientList return <Search listToFilter={filterList}/>
    //...
    
    // CON : getIngredientList PASADO POR PROPS
    /* en el input del form pondré el handleSearch, 
    y desde props traigo la lista entera y luego con .taget ya me sale buscao.

    */
  
    const [searchOneIngredient, setSearchOneIngredient] = useState("")

    const handleChange = (event) => {
        setSearchOneIngredient(event.target.value)
  
        props.filterList(event.target.value)
    }
  

    return (
    <div class="ingredientForm">
      <input  class="shadow p-3 mb-5 bg-body rounded" value={searchOneIngredient} id="formFile" type="text" onChange={handleChange} placeholder="Primer ingrediente" />
    </div>

  )
}

export default SearchIngredient