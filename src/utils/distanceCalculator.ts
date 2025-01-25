function singleSoftmax(value: number): number {
  const scaledValue = (value - 0.5) * 10;
  const expValue = Math.exp(scaledValue);
  const expBaseline = Math.exp(0);
  return expValue / (expValue + expBaseline);
}

export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  let similarity = dotProduct / (magnitudeA * magnitudeB);
  similarity = Math.max(similarity, 0);
  return singleSoftmax(similarity) * 100;
}
