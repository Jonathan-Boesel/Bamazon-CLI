var inquirer = require("inquirer");

var mysql = require("mysql");

var customer = require("./bamazonCustomer.js")
var manager = require("./bamazonManager.js")

function start() {
	inquirer.prompt([{
		type: "list",
		name: "answer",
		message: "Who are you?",
		choices: ["Customer", "Manager", "Supervisor"]
	}]).then(function(userInput) {
		if (userInput.answer === "Customer") {
			customer.start();
		}
		if (userInput.answer === "Manager") {
			console.log("G'day Manager!");
			manager.start();

		}
	});
}

start();


// Issues and questions:
// How to display trailing 0's when reading from mySQL i.e. $20.50 comes back as $20.5
// Auto_increment does not reset when a row is deleted i.e. if row ID 10 is deleted and the next added row will be ID 11
//		Is this normal/anticipated by other users looking at the table?
// Inquirer list sometimes relogs the question when arrow keys are hit
