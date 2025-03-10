import {useState, useEffect, useRef} from "react";
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromMistral } from "./server";
export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");
    const [error, setError] = useState(null);
    const recipeRef = useRef(null)


    useEffect(()=>{
        if(recipe && recipeRef.current){
            recipeRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [recipe])
    async function handleGetRecipe() {
        try {
            const generatedRecipe = await getRecipeFromMistral(ingredients)
            console.log("recipe fetched")
            setRecipe(generatedRecipe)
        } catch (err) {
            setError(err.message || "Failed to fetch the recipe");
        }
    }
    

    function addIngredient(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newIngredient = formData.get("ingredient");

        if (newIngredient) {
            setIngredients((prevIngredients) => [
                ...prevIngredients,
                newIngredient.trim(),
            ]);
            e.target.reset();
        }
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ref={recipeRef}
                    ingredients={ingredients}
                    handleGetRecipe={handleGetRecipe}
                />
            )}

            {error && <p className="error">{error}</p>}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}