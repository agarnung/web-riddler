<script lang="ts">
  /// <reference types="svelte" />
  import Input from './Input.svelte';
  import RiddleDisplay from './RiddleDisplay.svelte';
  import ChangeButton from './ChangeButton.svelte';
  import ProgressBar from './ProgressBar.svelte';
  import { getRandomRiddle } from '../utils/riddles';

  let userInput = '';
  let response = '';
  let error = '';
  let riddle = { question: '', solution: '' };
  let similarity = 0;

  const changeRiddle = () => {
    try {
      riddle = getRandomRiddle();
      console.log('New riddle loaded:', riddle);
      userInput = '';
      response = '';  
      error = '';    
      similarity = 0;
    } catch (err) {
      console.error('Error loading riddle:', err);
      riddle = { question: 'Error loading riddle.', solution: '' };
    }
  };

  const evaluateAnswer = async (event: CustomEvent) => {
    userInput = event.detail;
    try {
      console.log('Sending data to API:', { userInput, solution: riddle.solution });
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word1: userInput, word2: riddle.solution }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      similarity = data.cosineSimilarity;
      console.log('Calculated similarity:', similarity);
      response = `Similarity: ${similarity.toFixed(2)}%`;
      error = '';
    } catch (err) {
      console.error('Error processing the request:', err);
      error = 'Error processing the request.';
      response = '';
    }
  };

  // Load the riddle directly during initialization
  changeRiddle();
</script>

<div class="container">
  <h2>I'm giving you a riddle, try to guess it...</h2>

  <!-- Riddle Display Component -->
  <RiddleDisplay {riddle} />

  <!-- Input Component -->
  <Input bind:value={userInput} on:send={evaluateAnswer} />

  <!-- ChangeButton Component -->
  <ChangeButton
    changeRiddle={changeRiddle}
    isDisabled={false}
  />

  <!-- Display Response or Error -->
  {#if response}
    <p class="response-text">Model response: {response}</p>
  {/if}

  {#if error}
    <p class="error-text">Error: {error}</p>
  {/if}

  <!-- ProgressBar Component -->
  <ProgressBar {similarity} />
</div>

<style>
  .container {
    width: 100%;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h2 {
    font-size: 1.35em;
    margin-bottom: 20px;
    color: #333;
  }

  .response-text, .error-text {
    margin-top: 20px;
    font-size: 1.1em;
    font-weight: bold;
  }

  .response-text {
    color: #2d2d2d;
  }

  .error-text {
    color: #e74c3c;
  }
</style>

