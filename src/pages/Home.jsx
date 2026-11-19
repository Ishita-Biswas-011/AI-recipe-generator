import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import RecipeCard from "../Components/RecipeCard";
import { generateRecipeAPI } from "../api";

function Home() {
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [cuisine, setCuisine] = useState("Indian");
    const [diet, setDiet] = useState("Vegetarian");
    const [spiceLevel, setSpiceLevel] = useState("Medium");
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function addIngredient() {
        if (ingredient.trim() === "") {
            return;
        }

        setIngredients([...ingredients, ingredient]);
        setIngredient("");
    }

    function removeIngredient(indexToRemove) {
        const updatedIngredients = ingredients.filter(
            (_, index) => index !== indexToRemove
        );

        setIngredients(updatedIngredients);
    }

    async function generateRecipe() {
        if (ingredients.length === 0) {
            setError("Please add at least one ingredient.");
            return;
        }

        setError("");
        setLoading(true);

        const requestData = {
            ingredients: ingredients,
            cuisine: cuisine,
            diet: diet,
            spiceLevel: spiceLevel
        };

        console.log("Sending:", requestData);

        try {
            const data = await generateRecipeAPI(requestData);

            console.log("Recipe received from backend:", data);

            setRecipe(data);
        } catch (error) {
            console.error("Recipe generation error:", error);
            setError("Failed to generate recipe. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <div className="max-w-3xl mx-auto mt-16 px-4">

                <h1 className="text-5xl font-bold text-center text-white">
                    AI Recipe Generator
                </h1>

                <p className="text-center text-gray-400 mt-4">
                    Enter the ingredients you have and let AI create a delicious
                    recipe for you.
                </p>

                <div className="mt-10 flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter an ingredient..."
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        className="flex-1 p-3 rounded-lg border border-gray-600 bg-slate-800 text-white outline-none"
                    />

                    <button
                        onClick={addIngredient}
                        className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
                    >
                        Add
                    </button>
                </div>

                <div className="mt-8">

                    <h2 className="text-2xl font-semibold mb-4">
                        Ingredients
                    </h2>

                    {ingredients.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between bg-slate-800 p-3 rounded-lg mb-2"
                        >
                            <span>🥕 {item}</span>

                            <button
                                onClick={() => removeIngredient(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                ❌
                            </button>
                        </div>
                    ))}

                    <div className="mt-8">
                        <label className="block mb-2 font-semibold">
                            Cuisine
                        </label>

                        <select
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                            className="w-full p-3 rounded-lg bg-slate-800 border border-gray-600"
                        >
                            <option>Indian</option>
                            <option>Chinese</option>
                            <option>Italian</option>
                            <option>Mexican</option>
                            <option>Thai</option>
                        </select>
                    </div>

                    <div className="mt-8">
                        <label className="block mb-2 font-semibold">
                            Diet
                        </label>

                        <select
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)}
                            className="w-full p-3 rounded-lg bg-slate-800 border border-gray-600"
                        >
                            <option>Vegetarian</option>
                            <option>Vegan</option>
                            <option>Non-Vegetarian</option>
                        </select>
                    </div>

                    <div className="mt-8">
                        <label className="block mb-2 font-semibold">
                            Spice-Level
                        </label>

                        <select
                            value={spiceLevel}
                            onChange={(e) => setSpiceLevel(e.target.value)}
                            className="w-full p-3 rounded-lg bg-slate-800 border border-gray-600"
                        >
                            <option>Mild</option>
                            <option>Medium</option>
                            <option>Hot</option>
                        </select>
                    </div>

                    {error && (
                        <p className="mt-4 text-red-400 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={generateRecipe}
                        disabled={loading}
                        className="mt-8 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 py-3 rounded-lg font-bold text-lg"
                    >
                        {loading
                            ? "Generating Recipe..."
                            : "Generate Recipe"}
                    </button>

                    {recipe && <RecipeCard recipe={recipe} />}

                </div>
            </div>
        </>
    );
}

export default Home;