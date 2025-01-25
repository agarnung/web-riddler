import type { APIRoute } from 'astro';
import { getEmbeddings } from '../../lib/embeddingService';

function singleSoftmax(value: number): number {
  const scaledValue = (value - 0.5) * 10;
  const expValue = Math.exp(scaledValue);
  const expBaseline = Math.exp(0);
  return expValue / (expValue + expBaseline);
}

function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  let similarity = dotProduct / (magnitudeA * magnitudeB);
  similarity = Math.max(similarity, 0);
  return singleSoftmax(similarity) * 100;
}

export const POST: APIRoute = async ({ request }) => {
  const { word1, word2 } = await request.json();

  if (word1.toLowerCase() === word2.toLowerCase()) {
    return new Response(JSON.stringify({ cosineSimilarity: 100 }), { status: 200 });
  }

  try {
    const vectorA = await getEmbeddings(word1);
    const vectorB = await getEmbeddings(word2);

    const cosineSim = cosineSimilarity(vectorA, vectorB);

    return new Response(JSON.stringify({ cosineSimilarity: cosineSim }), { status: 200 });
  } catch (error) {
    console.error('Error comparing similarity:', error.message);
    return new Response(JSON.stringify({ error: 'Error comparing similarity' }), { status: 500 });
  }
};
