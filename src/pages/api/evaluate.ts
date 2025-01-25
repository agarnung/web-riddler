/// src/pages/api/evaluate.ts
import type { APIRoute } from 'astro';
import { getEmbeddings } from '../../lib/embeddingService';
import { cosineSimilarity } from '../../utils/distanceCalculator';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { userInput, solution } = await request.json();

    if (!userInput || !solution) {
      return new Response(JSON.stringify({ error: 'Both userInput and solution are required.' }), { status: 400 });
    }

    const userVector = await getEmbeddings(userInput);
    const solutionVector = await getEmbeddings(solution);

    const similarity = cosineSimilarity(userVector, solutionVector);

    return new Response(JSON.stringify({ similarity }), { status: 200 });
  } catch (error) {
    console.error('Error in evaluate API:', error);
    return new Response(JSON.stringify({ error: 'Error processing the request' }), { status: 500 });
  }
};
