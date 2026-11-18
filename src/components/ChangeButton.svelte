<script lang="ts">
  export let changeRiddle = () => {};
  export let isDisabled = false;
  export let label = "Next Riddle";
</script>

<button on:click={changeRiddle} disabled={isDisabled} class="riddle-button">
  {label}
</button>

<style>
  .riddle-button {
    padding: 10px 20px;
    background-color: #6b7280;
    color: white;
    font-size: 1.1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.15s ease;
  }

  .riddle-button:hover:not(:disabled) {
    background-color: #4b5563;
  }

  .riddle-button:active:not(:disabled) {
    background-color: #374151;
    transform: scale(0.97);
  }

  .riddle-button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
</style>

