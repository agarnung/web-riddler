<script lang="ts">
  import Input from './Input.svelte';
  import RiddleDisplay from './RiddleDisplay.svelte';
  import ChangeButton from './ChangeButton.svelte';
  import { getRandomRiddle } from '../scripts/riddles.ts';

  let userInput = '';
  let response = '';
  let error = '';
  let riddle = { question: '', solution: '' };

  const loadRiddle = () => {
    try {
      riddle = getRandomRiddle();
      console.log('Riddle loaded:', riddle);
    } catch (err) {
      console.error('Error loading riddle:', err);
      riddle = { question: 'Error loading riddle.', solution: '' };
    }
  };

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

  // Load the riddle directly during initialization
  loadRiddle();
</script>

<div class="container">
  <h2>I'm giving you a riddle, try to guess it...</h2>

  <!-- Riddle Display Component -->
  <RiddleDisplay {riddle} />

  <!-- Input Component -->
  <Input bind:userInput={userInput} />

  <!-- ChangeButton Component -->
  <ChangeButton
    handleSend={loadRiddle}
    isDisabled={false}
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

