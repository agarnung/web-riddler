import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const hfApiUrl = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';
const hfAccessToken = process.env.HUGGING_FACE_API_KEY;

export async function getEmbeddings(text: string): Promise<number[]> {
  const response = await fetch(hfApiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${hfAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: text }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch embeddings: ${response.statusText}`);
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
