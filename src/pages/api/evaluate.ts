import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const { userInput, solution } = await request.json();
  console.log('Received data:', { userInput, solution });

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: [userInput, solution],
      }),
    });

    const text = await response.text();
    console.log('Response from Hugging Face API:', text);
    const data = JSON.parse(text);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error processing the request:', error);
    return new Response(JSON.stringify({ error: 'Error processing the request.' }), { status: 500 });
  }
};
