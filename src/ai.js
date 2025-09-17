
export async function getRecipeFromMistral(ingredientsArr) {
  try {
    const res = await fetch("/.netlify/functions/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    })
    const data = await res.json()
    return data.recipe
  } catch (err) {
    console.error("Error generating recipe:", err.message)
    return null
  }
}

