// GLOBAL CONSTS
const PLAYER_ATTACK = 10;
const PLAYER_STRONG_ATTACK = 17;
const PLAYER_HEAL_VALUE = 20;
const MONSTER_ATTACK = 15;

const PLAYER_ATTACK_PARAMETER = 'PLAYER_ATTACK';
const PLAYER_STRONG_ATTACK_PARAMETER = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

// MAX LIFE INPUT
const lifeInput = prompt('Choose your and monster max life value.', '100');

// LET VARIABLES
let chosenMaxLife = parseInt(lifeInput, 10);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
	chosenMaxLife = 100;
}

let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

// LOAD HEALTH BARS
adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterLife, playerLife) {
	let logEntry = {
		event: event,
		value: value,
		monsterLife: monsterLife,
		playerLife: playerLife,
	};

	// IF METHOD
	if (event === LOG_EVENT_PLAYER_ATTACK) {
		logEntry.target = 'MONSTER';
	} else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
		logEntry.target = 'MONSTER';
	} else if (event === LOG_EVENT_MONSTER_ATTACK) {
		logEntry.target = 'PLAYER';
	} else if (event === LOG_EVENT_PLAYER_HEAL) {
		logEntry.target = 'PLAYER';
	}

	// SWITCH METHOD
	// switch (event) {
	// 	case LOG_EVENT_PLAYER_ATTACK:
	// 		logEntry.target = 'MONSTER';
	// 		break;
	// 	case LOG_EVENT_PLAYER_STRONG_ATTACK:
	// 		logEntry.target = 'MONSTER';
	// 		break;
	// 	case LOG_EVENT_MONSTER_ATTACK:
	// 		logEntry.target = 'PLAYER';
	// 		break;
	// 	case LOG_EVENT_PLAYER_HEAL:
	// 		logEntry.target = 'PLAYER';
	// 		break;
	// 	case LOG_EVENT_GAME_OVER:
	// 		break;
	// 	default:
	// 		logEntry = {};
	// }

	battleLog.push(logEntry);
}

function reset() {
	currentMonsterLife = chosenMaxLife;
	currentPlayerLife = chosenMaxLife;
	resetGame(chosenMaxLife);
}

function endRound() {
	const playerLifeRestore = currentPlayerLife;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
	currentPlayerLife -= playerDamage;
	writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterLife, currentPlayerLife);

	if (currentPlayerLife <= 0 && hasBonusLife) {
		hasBonusLife = false;
		setPlayerHealth(playerLifeRestore);
		currentPlayerLife = playerLifeRestore;
		removeBonusLife();
		alert('You fortunately had bonus life!');
	}

	if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
		alert('You killed Juzek!');
		writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentMonsterLife, currentPlayerLife);
	} else if (currentPlayerLife <= 0 && currentMonsterLife > 0) {
		alert('Juzek killed you :(');
		writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON', currentMonsterLife, currentPlayerLife);
	} else if (currentMonsterLife <= 0 && currentPlayerLife <= 0) {
		alert('It`s draw!');
		writeToLog(LOG_EVENT_GAME_OVER, 'A DRAW', currentMonsterLife, currentPlayerLife);
	}

	if (currentMonsterLife <= 0 || currentPlayerLife <= 0) {
		reset();
	}
}

function attack(kindOfAttack) {
	const kindOfDamage = kindOfAttack === PLAYER_ATTACK_PARAMETER ? PLAYER_ATTACK : PLAYER_STRONG_ATTACK;
	const logKindOfDamage =
		kindOfAttack === PLAYER_ATTACK_PARAMETER ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

	const monsterDamage = dealMonsterDamage(kindOfDamage);
	currentMonsterLife -= monsterDamage;
	writeToLog(logKindOfDamage, monsterDamage, currentMonsterLife, currentPlayerLife);
	endRound();
}

function attackHandler() {
	attack(PLAYER_ATTACK_PARAMETER);
}

function strongAttackHandler() {
	attack(PLAYER_STRONG_ATTACK_PARAMETER);
}

function healHandler() {
	let healValue;
	if (currentPlayerLife >= chosenMaxLife - PLAYER_HEAL_VALUE) {
		alert("You can't heal more than your maximum life");
		healValue = chosenMaxLife - currentPlayerLife;
	} else {
		healValue = PLAYER_HEAL_VALUE;
	}

	increasePlayerHealth(healValue);
	currentPlayerLife += healValue;
	writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterLife, currentPlayerLife);
	endRound();
}

function logHandler() {
	let i = 0;
	for (const logEntry of battleLog) {
		console.log(`%c#${i}`, 'color:orange; font-size:16px;');
		for (const key in logEntry) {
			console.log(`${key} ==> ${logEntry[key]}`);
		}
		i++;
	}
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', logHandler);
