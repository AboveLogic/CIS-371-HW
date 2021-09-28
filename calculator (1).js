
console.log('Welcome to the basic calculator');

let displayNumber = 0.0;

const readline = require('readline');
const rl = readline.createInterface({input : process.stdin , output : process.stdout});

console.log('Current Value: ' +displayNumber);

let userInput = 0.0;
let currentValue = 0.0;

//Request Value From User
function getValue(){

rl.question('Enter Value: ', 
	userInput=>{
console.log(`Current Value: ${userInput}`);
		operation();
		});
}

let output = 0.0;

//Determine the result based on selected operation
function result (userInput, operation){

	this.currentValue = currentValue;
	this.userInput = userInput;

	if (operation = '+'){
		output = currentValue + userInput;
		console.log(output);
	}
	else if(operation = '-'){
		output = currentValue + userInput;
		console.log(ouput);
	}
	else if(operation = '*'){
		output = currentValue * userInput;
		console.log(output);
	}
	else if(operation = '/'){    // && userInput || currentValue != 0){
		output = currentValue / userInput;
		console.log(output);
	}
	else if(operation = 'q'){
		rl.close();
		console.log('quitting');
		process.exit();
	}
	else{
		console.log('Improper Operation');
	}
	getValue();
}

//Request Operation From User
function operation (userOperation){
	rl.question('Enter Operation: (+, -, *, /)  q to quit',
	userOperation=>{
		console.log(`Operation: ${userOperation}`);
		result(userInput, operation);
		//rl.close();

	});
}

//Calls get value
getValue();


