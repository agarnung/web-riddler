/*import type { APIRoute } from 'astro';
import vue from '@vitejs/plugin-vue';

export const post: APIRoute = async ({ request }) => {
  const { userInput } = await request.json();

  const response = await fetch('https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: userInput }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Error al conectar con el modelo' }), { status: 500 });
  }

  const result = await response.json();
  return new Response(JSON.stringify(result), { status: 200 });
};*/

