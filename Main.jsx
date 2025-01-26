// import React from "react";
// import IngredientsList from "./components/IngredientsList";
// import ClaudeRecipe from "./components/ClaudeRecipe";
// import { getRecipeFromMistral } from "./server";

// export default function Main() {
//     const [ingredients, setIngredients] = React.useState([]);
//     const [recipe, setRecipe] = React.useState("");
//     const [error, setError] = React.useState(null);

//     async function handleGetRecipe() {
//         try {
//             setError(null);
//             setRecipe(""); 
    
//             const generatedRecipe = await getRecipeFromMistral(ingredients);
    
//             if (generatedRecipe) {
//                 setRecipe(generatedRecipe);
//             } else {
//                 setError("Could not generate a recipe. Try again later.");
//             }
//         } catch (err) {
//             console.error("Recipe fetch error:", err);
//             setError("Recipe generation failed. Check your connection.");
//         }
//     }
    

//     function addIngredient(e) {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const newIngredient = formData.get("ingredient");

//         if (newIngredient) {
//             setIngredients((prevIngredients) => [
//                 ...prevIngredients,
//                 newIngredient.trim(),
//             ]);
//         }
//         e.target.reset();
//     }

//     return (
//         <main>
//             <form onSubmit={addIngredient} className="add-ingredient-form">
//                 <input
//                     type="text"
//                     placeholder="e.g. oregano"
//                     aria-label="Add ingredient"
//                     name="ingredient"
//                 />
//                 <button type="submit">Add ingredient</button>
//             </form>

//             {ingredients.length > 0 && (
//                 <IngredientsList
//                     ingredients={ingredients}
//                     handleGetRecipe={handleGetRecipe}
//                 />
//             )}

//             {error && <p className="error">{error}</p>}

//             {recipe && <ClaudeRecipe recipe={recipe} />}
//         </main>
//     );
// }

import React from "react";
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { getRecipeFromMistral } from "./server";
export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState("");
    const [error, setError] = React.useState(null);

    async function handleGetRecipe() {
        try {
            const generatedRecipe = await getRecipeFromMistral(ingredients)
            setRecipe(generatedRecipe)
            // console.log("Fetching recipe...");  // Debugging line
            // setError(null);
            // setRecipe(""); // Clear the recipe before fetching
    
            // // Call the backend API to fetch the recipe
            // const response = await fetch("http://localhost:5000/api/recipe", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ ingredients }),
            // });
    
            // console.log("Response status:", response.status);  // Debugging line
    
            // if (!response.ok) {
            //     throw new Error(`Server error: ${response.statusText}`);
            // }
    
            // const data = await response.json();
            // setRecipe(data.recipe); // Assuming the server response contains { recipe: "..." }
        } catch (err) {
            console.error("Error fetching recipe:", err);  // Debugging line
            setError(err.message || "Failed to fetch the recipe");
        }
    }
    

    function addIngredient(e) {
        e.preventDefault(); // Prevent form submission
        const formData = new FormData(e.target);
        const newIngredient = formData.get("ingredient");

        if (newIngredient) {
            setIngredients((prevIngredients) => [
                ...prevIngredients,
                newIngredient.trim(),
            ]);
            e.target.reset(); // Clear the input field after adding
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
                    ingredients={ingredients}
                    handleGetRecipe={handleGetRecipe}
                />
            )}

            {error && <p className="error">{error}</p>}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}