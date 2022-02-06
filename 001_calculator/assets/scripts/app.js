const defaultResult = 0;
let currentResult = defaultResult;
let resultsLog = [];

function getDataFromInput() {
	return parseInt(userInput.value);
}

function getLog(operator, prevResult, fromInput, current) {
	const results = {
		operator: operator,
		prevResult: prevResult,
		fromInput: fromInput,
		currentResult: current,
	};
	resultsLog.push(results);
	console.log(resultsLog);
}

function returnResult(current, operator, input) {
	const description = `${current} ${operator} ${input}`;
	outputResult(currentResult, description);
}

function calculate(calcType) {
	const fromInput = getDataFromInput();
	const resultBefore = currentResult;
	let operator;

	if (
		(calcType !== 'ADD' && calcType !== 'SUBTRACT' && calcType !== 'MULTIPLY' && calcType !== 'DIVIDE') ||
		!fromInput
	) {
		return;
	}

	if (calcType === 'ADD') {
		currentResult += fromInput;
		operator = '+';
	} else if (calcType === 'SUBTRACT') {
		currentResult -= fromInput;
		operator = '-';
	} else if (calcType === 'MULTIPLY') {
		currentResult *= fromInput;
		operator = '*';
	} else if (calcType === 'DIVIDE') {
		currentResult /= fromInput;
		operator = '/';
	}

	returnResult(resultBefore, operator, fromInput, resultBefore);
	getLog(calcType, resultBefore, fromInput, currentResult);
}

function add() {
	calculate('ADD');
}

function subtract() {
	calculate('SUBTRACT');
}

function multiply() {
	calculate('MULTIPLY');
}

function divide() {
	calculate('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
