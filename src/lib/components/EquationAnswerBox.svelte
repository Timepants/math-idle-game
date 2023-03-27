<script>
  import { count } from '../stores/counter';
  import { getRandomInt } from '../utils/randomInt';
  import { goodStart, badStart } from '../stores/ticker';

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let correctAnswer = 0;

  let userAnswer = '';

  function checkAnswer() {
    dispatch('checkAnswer', {
      userAnswer: userAnswer
    });
    userAnswer = '';
  }
</script>

<div class="answer-container">
  <h3>Enter your answer:</h3>
  <div class="answer-input">
    <input
      type="number"
      bind:value={userAnswer}
      on:keydown={(e) => e.key === 'Enter' && checkAnswer()}
    />
    <button on:click={checkAnswer}>submit</button>
  </div>
  <div class="correct-answer">
    Correct answer: {correctAnswer}
  </div>
</div>

<style>
  .answer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-top: 0rem;
  }

  .answer-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input[type='number'] {
    font-size: 1rem;
    padding: 0.25rem;
    border: 2px solid #ccc;
    border-radius: 5px;
  }

  button {
    background-color: #4caf50;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #45a049;
  }

  .correct-answer {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }
</style>
