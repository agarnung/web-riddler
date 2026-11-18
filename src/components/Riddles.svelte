<!-- Riddgles.svelte -->
<script lang="ts">
  import Input from "./Input.svelte";
  import RiddleDisplay from "./RiddleDisplay.svelte";
  import ChangeButton from "./ChangeButton.svelte";
  import ProgressBar from "./ProgressBar.svelte";
  import CelebrationPopup from "./CelebrationPopup.svelte";
  import { getRandomRiddle } from "../utils/riddles";
  import {
    getDailyRiddle,
    closeness,
    type Riddle,
  } from "../utils/riddleLogic";
  import { t, type Lang } from "../utils/i18n";

  // @ts-ignore
  // TODO por por qué no lee bien las variables de entorno
  // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // const API_BASE_URL = 'http://localhost:4322/api';
  const API_BASE_URL = 'https://web-riddler.vercel.app/api';
  console.log("API_BASE_URL:", API_BASE_URL);

  let userInput = "";
  let error = "";
  let riddle: Riddle = { question: "", solution: "" };
  let lang: Lang = "en";
  let usedFallback = false;
  let similarity = 0;
  let analyzing = false;
  let analyzingText = "Analyzing";
  let intervalId;
  let showCelebrationPopup = false;
  let inputCleared = false;
  let showSolution = false;

  const changeRiddle = () => {
    try {
      riddle = getRandomRiddle(lang);
      usedFallback = false;
      if (!showCelebrationPopup) { 
        userInput = ""; 
        inputCleared = false;
      }
      error = "";
      similarity = 0;
      showSolution = false;
    } catch (err) {
      console.error("Error loading riddle:", err);
      riddle = { question: "Error loading riddle.", solution: "" };
    }
  };

    const showDailyRiddle = () => {
    try {
      riddle = getDailyRiddle(lang);
      usedFallback = false;
      userInput = "";
      error = "";
      similarity = 0;
      showSolution = false;
      inputCleared = false;
    } catch (err) {
      console.error("Error loading daily riddle:", err);
      riddle = { question: "Error loading riddle.", solution: "" };
    }
  };

  const revealSolution = () => {
    showSolution = !showSolution;
  };

  const toggleLanguage = () => {
    lang = lang === "en" ? "es" : "en";
    changeRiddle();
  };

  const evaluateAnswer = async (event: CustomEvent) => {
    userInput = event.detail;
    analyzing = true;
    analyzingText = "Analyzing"; 
    startAnalyzingText();  

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
        
        if (similarity >= 95) {
          showCelebrationPopup = true;
          setTimeout(() => {
            showCelebrationPopup = false;
            if (!inputCleared) {
              userInput = ""; 
              inputCleared = true;
            }
          }, 3000); 
        }
        else
        {
          userInput = ""; 
        }
      }
    } catch (err) {
      console.error("Error processing the request:", err);
      // The hosted embedding endpoint can be unavailable; fall back to the
      // deterministic local matcher so the game still works offline.
      similarity = closeness(userInput, riddle.solution);
      usedFallback = true;
      error = "";
    } finally {
      analyzing = false;
      stopAnalyzingText(); 
    }
  };

  const startAnalyzingText = () => {
  let dotCount = 1;
  intervalId = setInterval(() => {
    analyzingText = "Analyzing" + ".".repeat(dotCount);
    dotCount = dotCount === 3 ? 0 : dotCount + 1;
  }, 350); 
};

  const stopAnalyzingText = () => {
    clearInterval(intervalId);  
  };

  changeRiddle();
</script>

<div class="container">
  <div class="topbar">
    <span class="brand">web-riddler</span>
    <button
      class="lang-toggle"
      on:click={toggleLanguage}
      aria-label={t(lang, "languageLabel")}
    >
      {t(lang, "language")}
    </button>
  </div>

  <h2>{t(lang, "heading")}</h2>

  <RiddleDisplay {riddle} />

  <Input
    bind:value={userInput}
    on:send={evaluateAnswer}
    placeholder={t(lang, "placeholder")}
  />

  <div class="actions">
    <ChangeButton
      {changeRiddle}
      isDisabled={false}
      label={t(lang, "nextRiddle")}
    />
    <button class="daily-button" on:click={showDailyRiddle}>
      {t(lang, "dailyRiddle")}
    </button>
    <button class="solution-button" on:click={revealSolution}>
      {showSolution ? t(lang, "hideSolution") : t(lang, "showSolution")}
    </button>
  </div>

  {#if showSolution}
    <p class="solution-text">{t(lang, "solution")}: {riddle.solution}</p>
  {/if}

  {#if analyzing}
    <div class="analyzing_popup">{t(lang, "analyzing")}{analyzingText.replace(/^Analyzing/, "")}</div>
  {/if}

  <CelebrationPopup
    visible={showCelebrationPopup}
    message={t(lang, "correct")}
  />

  {#if error}
    <p class="error-text">{t(lang, "error")}: {error}</p>
  {:else if similarity > 0}
    <p class="response-text">{t(lang, "closeness")}: {similarity.toFixed(0)}%</p>
    {#if usedFallback}
      <p class="fallback-text">{t(lang, "offline")}</p>
    {/if}
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

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .brand {
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: lowercase;
    color: #6c5ce7;
  }

  .lang-toggle {
    border: 1px solid #6c5ce7;
    background: transparent;
    color: #6c5ce7;
    border-radius: 999px;
    padding: 6px 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }

  .lang-toggle:hover {
    background: #6c5ce7;
    color: #fff;
  }

  h2 {
    font-size: 1.35em;
    margin-bottom: 20px;
    color: #333;
  }

  .fallback-text {
    margin-top: 4px;
    font-size: 0.85em;
    color: #7f8c8d;
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

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 8px;
  }

  .daily-button,
  .solution-button {
    border: 0;
    border-radius: 8px;
    padding: 10px 14px;
    font-weight: 600;
    cursor: pointer;
    background-color: #2d2d2d;
    color: #fff;
    transition: background-color 0.2s;
  }

  .daily-button:hover,
  .solution-button:hover {
    background-color: #555;
  }

  .solution-text {
    margin-top: 16px;
    font-size: 1.05em;
    color: #2d2d2d;
  }

  .analyzing_popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 20px;
    border-radius: 10px;
    font-size: 1.2em;
    z-index: 1000;
  }
</style>
