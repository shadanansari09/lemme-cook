import { InferenceClient } from "@huggingface/inference"

const hf = new InferenceClient(process.env.HF_API_KEY)

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that an indian user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional local ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`

export async function handler(event, context) {
  try {
    const { ingredients } = JSON.parse(event.body)
    const ingredientsString = ingredients.join(", ")

    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: response.choices[0].message.content }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
