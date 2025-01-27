<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let type = 'text';
  export let value = '';
  export let placeholder = 'Type your message...';
  export let required = false;
  export let disabled = false;
  export let name = '';
  export let id = '';

  const dispatch = createEventDispatcher();
  
  let isFocused = false;

  function handleFocus() {
    isFocused = true;
  }
  
  function handleBlur() {
    isFocused = value.length > 0;  
  }
  
  /* Allow only letters and apostrophe */
  function handleInput(event: Event) {
    const input = (event.target as HTMLInputElement)?.value || '';
    const filteredInput = input.replace(/[^a-zA-Z'\s]/g, ''); 
    value = filteredInput;
    dispatch('input', value);
  }

  function handleSend() {
    if (value.trim()) {
      dispatch('send', value.trim());
      value = ''; // Clear input after sending
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
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
    placeholder=""
    on:input={handleInput}
    on:keypress={handleKeyPress}
    on:focus={handleFocus}
    on:blur={handleBlur}
    required={required}
    disabled={disabled}
    class="input-field"
  />
  <label for={id} class="input-label {isFocused || value ? 'focused' : ''}">
    {placeholder}
  </label>
  <button
    type="button"
    on:click={handleSend}
    class="send-button"
    aria-label="Send"
    on:blur={handleBlur}
    disabled={!value.trim() || disabled}
  >
  <span class="material-icons">send</span>
  </button>
</div>

<style>
  /* Import send icon from remote */
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  .input-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: 1rem auto;
  }

  .input-field {
    width: 100%;
    background: linear-gradient(to right, rgba(220, 220, 220, 0.7), rgba(245, 245, 245, 0.5));
    border: 0.5px solid #444;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    flex: 1;
    padding: 0.75rem 3rem 0.75rem 1rem;
    transition: border-color 0.3s, background-color 0.3s;
  }

  .input-field:focus {
    border-color: #6c5ce7;
  }

  .input-field:not(:focus) {
    filter: blur(1.25px);
  }
  
  .input-field:disabled {
    background-color: #f0f0f0;
    border-color: #333;
    cursor: not-allowed;
    color: #777;
  }

  .input-label {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.3s ease;
    background-color: transparent;
    padding: 0 0.25rem;
    color: #555;
  }
  
  .input-field:not(:focus) + .input-label {
    filter: blur(0.25px);
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
    color: #666;
  }

  .send-button {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: #6c5ce7;
    color: white;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .input-field:focus ~ .send-button {
    filter: none;
  }

  .send-button:not(:hover) {
    background: #ccc;
    cursor: not-allowed;
    filter: blur(0.5px);
  }

  .material-icons {
    font-size: 1.25rem;
  }
</style>

