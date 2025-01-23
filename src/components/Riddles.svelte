<script lang="ts">
  import { onMount } from 'svelte';
  let userInput = '';
  let response = '';
  let error = '';
  let riddle = 'Oro parece, oro no es; qué es?';
  let exactAnswer = 'Órono';

  const evaluateAnswer = async () => {
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });

      const data = await res.json();
      if (data.error) {
        error = data.error;
        response = '';
      } else {
        response = data.generated_text || 'Unclear response';
        error = '';
      }
    } catch (err) {
      error = 'Error processing the request.';
      response = '';
    }
  };
</script>

<div class="container">
  <h1>Riddles</h1>
  <div class="riddle">{riddle}</div>
  <textarea bind:value={userInput} placeholder="Write your answer..."></textarea>
  <button on:click={evaluateAnswer}>Submit</button>

  {#if response}
    <p class="response-text">Model response: {response}</p>
  {/if}

  {#if error}
    <p class="error-text">Error: {error}</p>
  {/if}
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

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

  h1 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
  }

  .riddle {
    font-size: 1.3em;
    margin-bottom: 15px;
    font-weight: bold;
    color: #444;
  }

  textarea {
    width: 100%;
    height: 120px;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    color: #333;
    resize: none;
    margin-bottom: 20px;
  }

  textarea:focus {
    border-color: #6c5ce7;
    outline: none;
  }

  button {
    padding: 10px 20px;
    background-color: #6c5ce7;
    color: white;
    font-size: 1.1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #5b21b6;
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

