import {useEffect, useState} from "react"


import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"

import { getRecipeFromMistral } from "../ai"
import { useRef } from "react"

export default function MainContent(){

    const [recipe, setRecipe] = useState("")

    const [ingredients, setIngredients] = useState([])

    const [loading, setLoading] = useState(false)
    const recipeSection = useRef(null)
    
    useEffect(()=>{
        if(recipe!="" && recipeSection.current!=null)
            {
                recipeSection.current.scrollIntoView({behavior:"smooth"})
            }
    },[recipe])

    // function handleSubmit(event){
    //     event.preventDefault()
    //     const formData = new FormData(event.currentTarget)
    //     const newIngredient = formData.get("ingredients")
    //     setIngredients(existingIngredients => [...existingIngredients,newIngredient])
    // }

    function kuchTohHai(formData){

        const newIngredient = formData.get("ingredients")
        setIngredients(prevState => [...prevState, newIngredient])
    }

    

   async function getRecipe(){
        setLoading(true)
       const generatedRecipe = await getRecipeFromMistral(ingredients)
       setRecipe(generatedRecipe)
       setLoading(false)
    }

    
    return(
        <main>
        <form action={kuchTohHai}>
            
            <input type="text" placeholder="eg. Egg" name="ingredients"/>
            <button type="submit">Add Ingredient</button>
        </form>
            {ingredients.length>0 && <IngredientsList recipe={getRecipe} ingredients={ingredients}/>}
            {loading && <div className="spinner"></div>}
           {recipe && <ClaudeRecipe ref={recipeSection} recipe={recipe}/>}
        </main>
    )
}