// selectors
const startBtn = document.querySelector('.btn');
const input = document.querySelector('.input-box input');
const popup = document.querySelector('.popup');
const messageField = popup.querySelector('.message');
const resetBtn = popup.querySelector('.reset');

// variables
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_CHOICE = ROCK;
const DRAW = 'DRAW';
const PLAYER_WIN = 'PLAYER_WIN';
const OPPONENT_WIN = 'OPPONENT_WIN';

let gameIsRunning = false;

// player turn
const getPlayerChoice = () => {
	const selection = input.value.toUpperCase();

	if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
		input.value = `Set ${DEFAULT_CHOICE} for you!`;
		return;
	}

	return selection;
};

// opponent turn
const getOpponentChoice = () => {
	const randomNumber = Math.random();
	if (randomNumber < 0.34) {
		return ROCK;
	} else if (randomNumber < 0.67) {
		return PAPER;
	} else {
		return SCISSORS;
	}
};

// winner logic
// usage default arguments in function \/
const getWinner = (oChoice, pChoice = DEFAULT_CHOICE) =>
	pChoice === oChoice
		? DRAW
		: (pChoice === ROCK && oChoice === SCISSORS) ||
		  (pChoice === PAPER && oChoice === ROCK) ||
		  (pChoice === SCISSORS && oChoice === PAPER)
		? PLAYER_WIN
		: OPPONENT_WIN;

// remove popup and reset game
const resetGame = () => {
	popup.classList.remove('show-popup');
	input.value = '';
	gameIsRunning = false; // reset game
};

// button which starts game
startBtn.addEventListener('click', () => {
	if (gameIsRunning) {
		return; // start new game is impossible when game is already started
	}
	gameIsRunning = true;

	const playerChoice = getPlayerChoice();
	const opponentChoice = getOpponentChoice();

	let winner;
	if (playerChoice) {
		winner = getWinner(opponentChoice, playerChoice);
	} else {
		winner = getWinner(opponentChoice); // usage default arguments in function
	}

	let message = `You picked ${playerChoice || DEFAULT_CHOICE} and opponent chose ${opponentChoice}`;
	if (winner === DRAW) {
		message += ' so it is draw';
	} else if (winner === PLAYER_WIN) {
		message += ' therefore you won!';
	} else {
		message += ' hence you lost';
	}
	messageField.textContent = message;
	popup.classList.add('show-popup');
});

resetBtn.addEventListener('click', resetGame);

// not related with game
// REST OPERATOR USAGE & CALLBACK

// rest operator merged all arguments from function call and put it in array
const sumUp = (...numbers) => {
	let result = 0;
	for (const number of numbers) {
		result += number;
	}
	return result;
};

// before ES6 rest operator introduce there was 'arguments' keyword which did the same, it is only available in 'function' declaration and doesnt create array but like-array object
const substractUp = function () {
	let result = 0;
	for (const number of arguments) {
		result -= number;
	}
	return result;
};

// callback & bind() is helpful when we dont want execute function but we want give them arguments, it is prepare function without execute
const add = (showResultButParameter, ...numbers) => {
	let result = 0;
	for (const number of numbers) {
		result += number;
	}

	showResultButParameter(result);
};

const substract = (showResultButParameter, ...numbers) => {
	let result = 0;
	for (const number of numbers) {
		result -= number;
	}

	showResultButParameter(result);
};

const showResult = (message, result) => {
	console.log(`${message} ${result}`);
};

// without callback
console.log(sumUp(1, 2, 3, 4, 5));
console.log(substractUp(1, 2));

// with callback and bind which prepare message but not execute function yet
add(showResult.bind(this, 'After added all numbers result is: '), 2, 2);
substract(showResult.bind(this, 'After substract all numbers result is: '), 4, 2);
