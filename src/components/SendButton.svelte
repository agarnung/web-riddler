<script lang="ts">
  export let handleSend = () => {};
  export let isDisabled = false;
</script>

<button on:click={handleSend} disabled={isDisabled} class="send-button"> Submit </button>

<style>
  .send-button {
    padding: 10px 20px;
    background-color: #6c5ce7;
    color: white;
    font-size: 1.1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .send-button:hover {
    background-color: #5b21b6;
  }
</style>

