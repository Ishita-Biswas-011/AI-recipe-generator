export async function generateRecipeAPI(recipeData) {
    const response = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipeData)
    });

    const data = await response.json();

    return data;
}