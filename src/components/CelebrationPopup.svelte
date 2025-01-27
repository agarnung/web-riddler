<!-- CelebrationPopup.svelte -->
<script lang="ts">
  export let visible: boolean = false; 
  export let message: string = "🎉 Correct! 🎉"; 
</script>

{#if visible}
  <div class="celebration-popup">
    {message}
  </div>
{/if}

<style>
  .celebration-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    background-color: rgba(76, 175, 80, 0.75);
    color: white;
    padding: 30px 50px;
    font-size: 1.5em;
    font-weight: bold;
    border-radius: 15px;
    box-shadow: 5px 8px 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: celebration-zoom 1s infinite alternate;
  }

  @keyframes celebration-zoom {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
</style>

