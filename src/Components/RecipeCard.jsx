function RecipeCard({ recipe }) {
  return (
    <div className="mt-10 bg-slate-800 rounded-xl p-6 shadow-lg">

      <h2 className="text-3xl font-bold text-orange-400">
        {recipe.title}
      </h2>

      <div className="flex gap-6 mt-4 text-gray-300">
        <p>🍽 Cuisine: {recipe.cuisine}</p>
        <p>⏱ {recipe.time}</p>
        <p>👨‍🍳 {recipe.servings} Servings</p>
      </div>

      <h3 className="text-xl font-semibold mt-6">
        Ingredients
      </h3>

      <ul className="list-disc ml-6 mt-2">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-6">
        Instructions
      </h3>

      <ol className="list-decimal ml-6 mt-2">
        {recipe.instructions.map((step, index) => (
          <li key={index} className="mb-2">
            {step}
          </li>
        ))}
      </ol>

    </div>
  );
}

export default RecipeCard;