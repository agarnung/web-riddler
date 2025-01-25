import type { APIRoute } from 'astro';
import { getEmbeddings } from '../../utils/embeddingService';
import { cosineSimilarity } from '../../utils/distanceCalculator';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userInput, solution } = await request.json();
    console.log('Received data:', { userInput, solution });

    if (!userInput || !solution) {
      return new Response(JSON.stringify({ error: 'User input and solution are required' }), { status: 400 });
    }

    const userVector = await getEmbeddings(userInput);
    const solutionVector = await getEmbeddings(solution);

    const similarity = cosineSimilarity(userVector, solutionVector);

    return new Response(JSON.stringify({ similarity }), { status: 200 });
  } catch (error) {
    console.error('Error processing the request:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};
