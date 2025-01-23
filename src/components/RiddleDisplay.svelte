<!-- src/components/RiddleDisplay.svelte -->
<script lang="ts">
  export let riddle = '';
</script>

<div class="riddle">
  {riddle}
</div>

<style>
  .riddle {
    font-size: 1.3em;
    margin-bottom: 15px;
    font-weight: bold;
    color: #444;
  }
</style>

