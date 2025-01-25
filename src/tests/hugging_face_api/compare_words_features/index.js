import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const hfApiUrl = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';
const hfAccessToken = process.env.HF_ACCESS_TOKEN;

function singleSoftmax(value) {
  const scaledValue = (value - 0.5) * 10;
  const expValue = Math.exp(scaledValue);
  const expBaseline = Math.exp(0);
  return expValue / (expValue + expBaseline);
}

function cosineSimilarity(vectorA, vectorB) {
  const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  let similarity = dotProduct / (magnitudeA * magnitudeB);
  similarity = Math.max(similarity, 0);
  return singleSoftmax(similarity) * 100;
}

async function extractFeatures(text) {
  try {
    const response = await fetch(hfApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
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

  } catch (error) {
    console.error('Error extracting features:', error.message);
    throw error;
  }
}

async function compareSimilarity(word1, word2) {
  if (word1.toLowerCase() === word2.toLowerCase()) {
    return {
      cosineSimilarity: 100,
    };
  }

  try {
    const vectorA = await extractFeatures(word1);
    const vectorB = await extractFeatures(word2);

    const cosineSim = cosineSimilarity(vectorA, vectorB);

    return {
      cosineSimilarity: cosineSim,
    };
  } catch (error) {
    console.error('Error comparing similarity:', error.message);
    return null;
  }
}

(async () => {
  const riddleResult = 'record';
  const riddleAnswer = 'sea';

  const similarityMetrics = await compareSimilarity(riddleResult, riddleAnswer);

  if (similarityMetrics) {
    console.log(`Comparison between "${riddleResult}" and "${riddleAnswer}":`);
    console.log(`- Cosine Similarity (Softmax): ${similarityMetrics.cosineSimilarity.toFixed(2)}%`);
  } else {
    console.log('An error occurred while calculating similarity.');
  }
})();

