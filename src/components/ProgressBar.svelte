<script lang="ts">
  export let similarity = 0;

  $: progressColor = similarity > 50 ? 'green' : similarity > 25 ? 'yellow' : 'red';
</script>

<div class="progress-bar-container">
  <div class="progress-bar" style="width: {similarity}%; background-color: {progressColor};"></div>
</div>

<style>
  .progress-bar-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 20px;
  }

  .progress-bar {
    height: 20px;
    transition: width 0.3s ease;
  }
</style>
