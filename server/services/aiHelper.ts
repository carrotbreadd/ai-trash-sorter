import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function aiAssist(item: string) {
  const prompt = `Classify this item for disposal into Recycle, Compost, or Landfill: ${item}. 
Return ONLY the category as the first word, then a colon, then a short explanation. Example: "Recycle: Plastic bottles can be recycled."`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  // Safely get the text
  const content =
    completion.choices?.[0]?.message?.content?.trim() ||
    "Unknown: No explanation provided";

  // Split into category and explanation
  const colonIndex = content.indexOf(":");
  let category = "Unknown";
  let explanation = "No explanation provided";

  if (colonIndex !== -1) {
    category = content.slice(0, colonIndex).trim();
    explanation = content.slice(colonIndex + 1).trim();
  } else {
    category = content; // fallback if colon not found
  }

  return { category, explanation };
}
