<!-- src/components/Riddles.svelte -->
<script lang="ts">
  import Input from './Input.svelte';
  import RiddleDisplay from './RiddleDisplay.svelte';
  import Button from './Button.svelte';
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

  <!-- Riddle Display Component -->
  <RiddleDisplay {riddle} />

  <!-- Input Component -->
  <Input bind:userInput={userInput} />

  <!-- Button Component -->
  <Button
    handleSend={evaluateAnswer}
    isDisabled={!userInput.trim()}
  />

  <!-- Display Response or Error -->
  {#if response}
    <p class="response-text">Model response: {response}</p>
  {/if}

  {#if error}
    <p class="error-text">Error: {error}</p>
  {/if}
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

  h1 {
    font-size: 2em;
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

