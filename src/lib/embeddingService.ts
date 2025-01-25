export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await fetch('https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

	if (!response.ok) {
	  const errorText = await response.text();
	  console.error(`Error from Hugging Face API: ${response.status} ${response.statusText} - ${errorText}`);
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
  } catch (error) {
    console.error('Error extracting features:', error.message);
    throw error;
  }
}
