import React from 'react'
import { getIngredientList } from '../services/ingredient.service'

function SearchIngredient() {
  //! mirar lab-react-ironnutrition > App.js
    //1. creamos estado de list + listToShow
    //2. const filterList

    //en IngredientList return <Search listToFilter={filterList}/>
    //...
    
    // CON : getIngredientList PASADO POR PROPS
    /* en el input del form pondré el handleSearch, 
    y desde props traigo la lista entera y luego con .taget ya me sale buscao.

    */
  
    return (
    <div>SearchIngredient</div>
  )
}

export default SearchIngredient