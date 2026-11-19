const express = require("express");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

router.post("/", async (req, res) => {
    const { ingredients, cuisine, diet, spiceLevel } = req.body;

    console.log("Ingredients:", ingredients);
    console.log("Cuisine:", cuisine);
    console.log("Diet:", diet);
    console.log("Spice Level:", spiceLevel);

    const prompt = `
    Create a recipe using the following information:

    Ingredients: ${ingredients.join(", ")}
    Cuisine: ${cuisine}
    Diet: ${diet}
    Spice Level: ${spiceLevel}
     Return ONLY valid JSON in this exact structure:

    {
        "title": "Recipe name",
        "cuisine": "Cuisine name",
        "time": "Cooking time",
        "servings": 2,
        "ingredients": [
            "ingredient 1",
            "ingredient 2"
        ],
        "instructions": [
            "Step 1",
            "Step 2",
            "Step 3"
        ]
    }

    Do not add markdown or explanations outside the JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config:{
            responseMimeType: "application/json"
            }
        });

        console.log("Gemini response:", response.text);

        const recipe = JSON.parse(response.text);

        res.json(recipe);


    } catch (error) {
        console.error("Gemini error:", error);

        res.status(500).json({
            error: "Failed to generate recipe"
        });
    }
});

module.exports = router;