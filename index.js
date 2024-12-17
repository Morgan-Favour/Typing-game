const userInput = document.getElementById("user-input");
const startBtn = document.getElementById("start-btn");
const messageDisplay = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const wordDisplay = document.getElementById("word-to-type");
const scoreDisplay = document.getElementById("score");

let timer;
let timeLeft = 10; // Time limit in seconds
let score = 0; 
let currentWordIndex = 0; 
let currentWord = ""; 

const wordList = [
  "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", 
  "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", 
  "quince", "raspberry", "strawberry", "tangerine", "ugli fruit", "watermelon",
]; // List of words

userInput.disabled = true;
startBtn.addEventListener("click", startGame);

function startGame() {
  // Reset variables
  score = 0;
  currentWordIndex = 0;
  timeLeft = 10; 
  currentWord = wordList[currentWordIndex]; 
  wordDisplay.textContent = currentWord; 
  scoreDisplay.textContent = `Score: ${score}`;
  messageDisplay.textContent = "";
  timerDisplay.textContent = `Time: ${timeLeft}s`;

  userInput.value = "";
  userInput.disabled = false;
  startBtn.disabled = true;
  
  userInput.focus();

  // Start the timer
  timer = setInterval(updateTimer, 1000);

  
  userInput.removeEventListener("input", checkInput); 
  userInput.addEventListener("input", checkInput);
}

function checkInput() {
  // Check if the typed word matches the current word
  if (userInput.value === currentWord) {
    score += 10; // 10 points for each correct word
    scoreDisplay.textContent = `Score: ${score}`;

    
    currentWordIndex++;
    if (currentWordIndex < wordList.length) {
      currentWord = wordList[currentWordIndex]; 
      wordDisplay.textContent = currentWord; 
      userInput.value = ""; 
    } else {
      gameOver("Congratulations! You finished the game");
    }
  }
}

function gameOver(message) {
  messageDisplay.textContent = message;
  userInput.disabled = true;
  startBtn.disabled = false;
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `Time: ${timeLeft}s`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    wordDisplay.textContent = "";
    gameOver("Time's up!");
  }
}
