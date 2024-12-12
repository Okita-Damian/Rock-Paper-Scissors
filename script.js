// Initialize the score
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const updateScoreDisplay = () => {
  document.getElementById('player-score').innerText = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
};

// Pick computer move
const computerMove = () => {
  const myArray = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * myArray.length);
  return myArray[randomIndex];
};

// Determine the result of the game
const determineResult = (playerMove, computerMove) => {
  if (playerMove === computerMove) {
    return 'Tie';
  } else if (
    (playerMove === 'Rock' && computerMove === 'Scissors') ||
    (playerMove === 'Paper' && computerMove === 'Rock') ||
    (playerMove === 'Scissors' && computerMove === 'Paper')
  ) {
    return 'you win';
  } else {
    return 'you lose';
  }
};

// Update the score based on the result
const updateScore = (result) => {
  if (result === 'you win') {
    score.wins += 1;
  } else if (result === 'you lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score)); // Save updated score to localStorage
};

// Handle button clicks for Rock, Paper, and Scissors
document.querySelectorAll('.rpsButton').forEach(button => {
  button.addEventListener('click', (e) => {
    const playerMove = e.target.value;
    const computerMoveChoice = computerMove();
    const result = determineResult(playerMove, computerMoveChoice);

    // Update hands display
    document.getElementById('hands').innerText = `Player: ${playerMove} vs Computer: ${computerMoveChoice}`;

    // Display the result
    document.getElementById('result').innerText = result;

    // Update the score and display
    updateScore(result);
    updateScoreDisplay();
  });
});

// End Game button functionality
document.getElementById('endGameButton').addEventListener('click', () => {
  // Reset the score
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.setItem('score', JSON.stringify(score)); // Clear the stored score
  updateScoreDisplay();
  document.getElementById('hands').innerText = '';
  document.getElementById('result').innerText = '';
});
