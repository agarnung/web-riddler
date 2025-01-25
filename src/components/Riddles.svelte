<!-- Riddgles.svelte -->
<script lang="ts">
  import Input from "./Input.svelte";
  import RiddleDisplay from "./RiddleDisplay.svelte";
  import ChangeButton from "./ChangeButton.svelte";
  import ProgressBar from "./ProgressBar.svelte";
  import { getRandomRiddle } from "../utils/riddles";

  // @ts-ignore
  // TODO por por qué no lee bien las variables de entorno
  // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE_URL = 'http://localhost:4321/api';
  // const API_BASE_URL = 'https://web-riddler.vercel.app/api';
  console.log("API_BASE_URL:", API_BASE_URL);

  let userInput = "";
  let error = "";
  let riddle = { question: "", solution: "" };
  let similarity = 0;

  const changeRiddle = () => {
    try {
      riddle = getRandomRiddle();
      userInput = "";
      error = "";
      similarity = 0;
    } catch (err) {
      console.error("Error loading riddle:", err);
      riddle = { question: "Error loading riddle.", solution: "" };
    }
  };

  const evaluateAnswer = async (event: CustomEvent) => {
    userInput = event.detail;
    try {
      if (!API_BASE_URL) {
        throw new Error("API_BASE_URL is not defined!");
      }
      const res = await fetch(`${API_BASE_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput, solution: riddle.solution }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (data.error) {
        error = data.error;
      } else {
        similarity = data.similarity || 0;
        error = "";
      }
    } catch (err) {
      console.error("Error processing the request:", err);
      error = "Error processing the request.";
    }
  };

  changeRiddle();
</script>

<div class="container">
  <h2>I'm giving you a riddle, try to guess it...</h2>

  <RiddleDisplay {riddle} />

  <Input bind:value={userInput} on:send={evaluateAnswer} />

  <ChangeButton {changeRiddle} isDisabled={false} />

  {#if error}
    <p class="error-text">Error: {error}</p>
  {:else}
    <p class="response-text">Similarity: {similarity}%</p>
  {/if}

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

  .response-text,
  .error-text {
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
