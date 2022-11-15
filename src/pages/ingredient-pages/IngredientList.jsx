import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import SearchIngredient from '../../components/SearchIngredient'

//!Ens carreguem aquest page?


import IngredientAdd from '../../components/IngredientAdd'
import {  getIngredientListService } from '../../services/ingredients.services'

function IngredientList() {

  const navigate = useNavigate();

  //states
  const [ ingredientList, setIngredientList ] = useState([])
  const [ingredientListToShow, setIngredientListToShow] = useState([])
  const [formIsShowing, setFormIsShowing] = useState(false)

  //for loading time
  const [isFetching, setIsFetching] = useState(true)

  //calling the API
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    try {
     const response = await getIngredientListService()
     console.log("response data: " , response.data)
     setIngredientList(response.data)
     setIngredientListToShow(response.data)

     setIsFetching(false)

    }catch (error) {
      navigate("/error")
    }
  }



  const filterList = (filterQuery) => { 
        
    const filterArr = ingredientList.filter((eachEl) => {
      return eachEl.name.includes(filterQuery)
    })
    console.log(filterArr)
    setIngredientListToShow(filterArr)
  }

    //to hide the form unless pressing the button
    const toggleForm = () => setFormIsShowing(!formIsShowing)

      //!only if it's admin
  const deleteIngredient = (ItemName) => {
    const filteredList = ingredientListToShow.filter((eachEl) => (eachEl.name === ItemName) ? false : true)
    setIngredientListToShow(filteredList);
  } //acabar config ironnutricion lab

  //! change to loading SPINNER
  if (isFetching === true) {
    return <h3>...buscando</h3>
  }

  return (
    <div>
      <div>
        <button onClick={toggleForm}>Add recipe</button> 
        {formIsShowing === true 
          ? <ingredientAdd getData={getData}/>
          : null }
      </div>
      <div>
      <h1>Check all the ingredients!</h1>
    
      <SearchIngredient filterList={filterList}/> 
    
      <br/>
      </div>
      <div>
      {ingredientListToShow.map((eachIngredient) => {
        return (
          <div key={eachIngredient._id}>
            <Link to={`/ingredient/${eachIngredient._id}/details`}>
              <img src={eachIngredient.image} alt={eachIngredient.name} width={200} />
              <p>{eachIngredient.name}</p>
              
            </Link>
          </div>
      
        )
      })}



      </div>

    </div>
  )
}

export default IngredientList