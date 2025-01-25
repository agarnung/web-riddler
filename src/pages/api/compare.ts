import type { APIRoute } from 'astro';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const hfApiUrl = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';
const hfAccessToken = process.env.HUGGING_FACE_API_KEY;

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

async function extractFeatures(text: string): Promise<number[]> {
  const response = await fetch(hfApiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${hfAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: text }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const result = await response.json();

  if (Array.isArray(result) && result.length > 0) {
    if (Array.isArray(result[0]) && result[0].every((item) => typeof item === 'number')) {
      return result[0];
    }
    if (result.every((item) => typeof item === 'number')) {
      return result;
    }
  }

  throw new Error("Unexpected response format. Full response: " + JSON.stringify(result));
}

export const post: APIRoute = async ({ request }) => {
  const { word1, word2 } = await request.json();

  if (word1.toLowerCase() === word2.toLowerCase()) {
    return new Response(JSON.stringify({ cosineSimilarity: 100 }), { status: 200 });
  }

  try {
    const vectorA = await extractFeatures(word1);
    const vectorB = await extractFeatures(word2);

    const cosineSim = cosineSimilarity(vectorA, vectorB);

    return new Response(JSON.stringify({ cosineSimilarity: cosineSim }), { status: 200 });
  } catch (error) {
    console.error('Error comparing similarity:', error.message);
    return new Response(JSON.stringify({ error: 'Error comparing similarity' }), { status: 500 });
  }
};
