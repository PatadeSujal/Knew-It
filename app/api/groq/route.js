// app/api/groq/route.js
export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages,
      }),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
