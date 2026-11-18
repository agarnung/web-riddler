/// src/pages/api/evaluate.ts
import type { APIRoute } from 'astro';
import { getEmbeddings } from '../../lib/embeddingService';
import { cosineSimilarity } from '../../utils/distanceCalculator';
import { closeness } from '../../utils/riddleLogic';

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  let userInput = '';
  let solution = '';

  try {
    const body = (await request.json()) as {
      userInput?: unknown;
      solution?: unknown;
    };
    userInput = typeof body.userInput === 'string' ? body.userInput : '';
    solution = typeof body.solution === 'string' ? body.solution : '';
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  if (!userInput.trim() || !solution.trim()) {
    return json({ error: 'Both userInput and solution are required.' }, 400);
  }

  // The local matcher is deterministic and needs no token or network. Use it
  // directly when the embedding endpoint is not configured, and as a fallback
  // whenever Hugging Face is unavailable (cold start, quota, 5xx, timeout).
  const local = closeness(userInput, solution);

  // Exact answers and article variants are already resolved locally; do not let a
  // weaker embedding score downgrade them.
  if (local === 100) {
    return json({ similarity: 100, fallback: false, reason: 'exact-local' });
  }

  if (!process.env.HUGGING_FACE_TOKEN) {
    console.warn('HUGGING_FACE_TOKEN is not set; using the local matcher.');
    return json({ similarity: local, fallback: true, reason: 'no-token' });
  }

  try {
    const [userVector, solutionVector] = await Promise.all([
      getEmbeddings(userInput),
      getEmbeddings(solution),
    ]);
    const similarity = Math.max(
      local,
      Math.round(cosineSimilarity(userVector, solutionVector))
    );
    return json({ similarity, fallback: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Embedding API failed; using the local matcher:', message);
    return json({ similarity: local, fallback: true, reason: 'embedding-error' });
  }
};
