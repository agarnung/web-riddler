<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let type = 'text';
  export let value = '';
  export let label = 'Input';
  export let name = '';
  export let id = '';
  export let required = false;
  export let disabled = false;
  export let callback = () => {};
  
  const dispatch = createEventDispatcher();
 
  function handleInput(event) {
    value = event.target.value;
    dispatch('input', value);
  }
  
  function handleSend() {
    dispatch('send', value);
    callback();
  }

  let isFocused = false;
  function handleFocus() {
    isFocused = true;
  }

  function handleBlur() {
    isFocused = value.length > 0;  
  }
   
  function handleKeyPress(event) {
    if (event.key === " ") {
      event.preventDefault();  
    }
    if (event.key === 'Enter') {
      handleSend();  
    }
  }
</script>

<div class="input-container">
  <input
    bind:value
    type={type}
    id={id}
    name={name}
    placeholder=" "
    on:input={handleInput}
    on:keypress={handleKeyPress}
    on:focus={handleFocus}
    on:blur={handleBlur}
    required={required}
    disabled={disabled}
    class="input-field"
  />
  <label for={id} class="input-label {isFocused || value ? 'focused' : ''}">
    {label}
  </label>
  <button
    type="button"
    on:click={handleSend}
    class="send-button"
    aria-label="Send"
    disabled={disabled || !value.trim()}
  >
  
  </button>
</div>

<style>
  .material-icon {
    font-family: 'Material Icons';
  }

  .input-container {
    position: relative;
    margin: 1.5rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    --theme-color: rgba(0, 0, 0, 0.3);   
  }

  .input-field {
    width: 100%;
    padding: 1rem 2.5rem 1rem 0.75rem; 
    background: linear-gradient(to right, rgba(70, 70, 70, 0.7), rgba(90, 90, 90, 0.5));
    border: 1px solid #444;
    border-radius: 8px;
    color: #e0e0e0;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s, background-color 0.3s;
  }

  .input-field:focus {
    border-color: rgba(200, 75, 75);
    background: linear-gradient(to right, #383838, #797979);
  }

  .input-field:not(:focus) {
    filter: blur(1.5px);
  }
  
  .input-field:disabled {
    background-color: #1e1e1e;
    border-color: #333;
    cursor: not-allowed;
    color: #777;
  }

  .input-label {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    color: rgb(255, 255, 255, 0.7);
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.3s ease;
    background-color: transparent;
    padding: 0 0.25rem;
  }

  .input-field:focus + .input-label,
  .input-field:not(:placeholder-shown) + .input-label,
  .input-label.focused {
    top: -0.6rem;
    left: 0.65rem;
    font-size: 0.8rem;
    color: var(--theme-color);
  }

  .input-field:disabled + .input-label {
    color: #555;
  }

  .send-button {
    position: absolute;
    right: 0.75rem;
    background: none;
    border: none;
    color: var(--theme-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: color 0.3s;
    font-size: 1.5rem;
  }

</style>

