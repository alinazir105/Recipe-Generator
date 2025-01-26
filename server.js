// import express from "express";
// import { HfInference } from "@huggingface/inference";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors())
// const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
// `;

// app.post("/api/recipe", async (req, res) => {
//     const { ingredients } = req.body;
//     if (!ingredients || !Array.isArray(ingredients)) {
//         return res.status(400).json({ error: "Invalid ingredients array" });
//     }

//     try {
//         const ingredientsString = ingredients.join(", ");
//         console.log("Ingredients:", ingredientsString);  // Debugging line
//         const response = await hf.chatCompletion({
//             model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//             messages: [
//                 { role: "system", content: SYSTEM_PROMPT },
//                 { 
//                     role: "user", 
//                     content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
//                 }
//             ],
//             max_tokens: 1024,
//         })
//         console.log("Generated Recipe:", response.choices[0].message.content);  // Debugging line
//         return res.json({recipe: response.choices[0].message.content})
//     } catch (err) {
//         console.error('HuggingFace API Error:', err.message)
//         throw new Error(`Failed to get recipe: ${err.message}`)
//     }
// });


// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

const hf = new HfInference(import.meta.env.HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}