import type { APIRoute } from 'astro';
import { getEmbeddings } from '../../utils/embeddingService';

export const post: APIRoute = async ({ request }) => {
  try {
    const { userInput, solution } = await request.json();
    console.log('Received data:', { userInput, solution });

    if (!userInput || !solution) {
      return new Response(JSON.stringify({ error: 'User input and solution are required' }), { status: 400 });
    }

    const userVector = await getEmbeddings(userInput);
    const solutionVector = await getEmbeddings(solution);

    return new Response(JSON.stringify({ user_vector: userVector, solution_vector: solutionVector }), { status: 200 });
  } catch (error) {
    console.error('Error processing the request:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};
