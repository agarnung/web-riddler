// src/lib/embeddingService.ts
export async function getEmbeddings(text: string): Promise<number[]> {
  const response = await fetch('https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: text }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch embeddings: ${response.statusText}`);
  }

  const result = await response.json();
  return result[0]; // Assumes result is an array with the embedding as the first element
}
