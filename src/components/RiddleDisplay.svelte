<script lang="ts">
  export let riddle: { question: string, solution: string };
</script>

<div class="riddle-display">
  <h2>{riddle.question || "No riddle available"}</h2>
</div>

<style>
  .riddle-display {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.15em;
    font-style: italic;
    color: #33B;
  }
</style>

