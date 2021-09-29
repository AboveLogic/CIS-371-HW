//Basic Javascript Calculator that handles adding subtraction
//multiplication and division.
//@author Travis Post
//@version Fall 2021 CIS 371

console.log('Welcome to the basic calculator');

const readline = require('readline');
const rl = readline.createInterface({input : process.stdin , output : process.stdout});

//Declare userInput and currentValue
let userInput = 0;
let currentValue = 0;

//Request Value From User
function getValue(){
		rl.question('Enter Value: ', 
			userInput=>{
		if (isNaN(userInput)){
			console.log('Please Enter A Number');
			getValue();
		}
		else {
			operation("aa", userInput);
		}
	});
}


//Determine the result based on selected operation
function result (userOperation, userInput){

	currentValue = parseFloat(currentValue);
	userInput = parseFloat(userInput);
	
	if (userOperation === '+'){
		currentValue = currentValue + userInput;
		console.log(`result: ${currentValue}`);
		getValue();
	}
	else if(userOperation === '-'){
		currentValue = currentValue - userInput;
		console.log(`result: ${currentValue}`);
		getValue();
	}
	else if(userOperation === '*'){
		currentValue = currentValue * userInput;
		console.log(`result: ${currentValue}`);
		getValue();
	}
	else if(userOperation === '/'){    
		if (userInput != 0){
			currentValue = currentValue / userInput;
			console.log(`result: ${currentValue}`);
			getValue();
			}
		else {
			console.log('Can not divide by zero, please enter a new operation.');
			operation("aa", userInput);
		}
	}
	else if(userOperation === 'q'){
		rl.close();
		console.log('quitting');
		throw new Error(
			'You Have Successfully Quit');
	}
	else{
		console.log('Improper Operation');
		operation("aa", userInput);
	}
	
}

//Request Operation From User
function operation (userOperation, userInput){
			rl.question('Enter Operation: (+, -, *, /)  q to quit: ',
				userOperation=>{
			console.log(`Operation: ${userOperation}`);
			result(userOperation, userInput);
		});
}

//Calls get value
getValue();


