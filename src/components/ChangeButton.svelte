<script lang="ts">
  export let changeRiddle = () => {};
  export let isDisabled = false;
</script>

<div>
  <button on:click={changeRiddle} disabled={isDisabled} class="riddle-button">
    Next Riddle
  </button>
</div>

<style>
  .riddle-button {
    padding: 10px 20px;
    background-color: #6c5ce7;
    color: white;
    font-size: 1.1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .riddle-button:hover {
    background-color: #5b21b6;
  }

  .riddle-button:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
</style>

