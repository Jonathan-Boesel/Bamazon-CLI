//Starting Prompt
var inquirer = require("inquirer");

var mysql = require("mysql");

require('console.table')

// npm-init

var query = ""

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "",
	database: "bamazonDB"
});

connection.connect(function(err) {
	if (err) throw err;

});

var start = function() {
	inquirer.prompt({
		name: "buyPrompt",
		type: "rawlist",
		message: "Welcome to BAMAZON! Please choose from the following: Here to [BUY] an item or [ADMIN] access",
		choices: ["BUY", "ADMIN"]
	}).then(function(answer) {
		if (answer.buyPrompt.toUpperCase() == "BUY") {
			buyItem();
		}
		else {
			console.log("ADMIN ACCESS NOT SET UP YET");
		}
	})
};




var buyItem = function() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		// console.log(res);
		inquirer.prompt([{
				name: "choice",
				type: "list",
				choices: function() {
					var choiceArray = [];
					for (var i = 0; i < res.length; i++) {
						console.log("Product ID: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + " Price: " + res[i].price + " Department Name: " + res[i].department_name + " Stock Count: " + res[i].stock_quantity);
						choiceArray.push(JSON.stringify(res[i].item_id));
					}
					console.log("Please choose your item by corresponding ID number:")
					return choiceArray;
				},

				message: "What item would you like to buy?"
			},
			{
				name: "howMany",
				type: "input",
				message: "How many units would you like to buy?",
				validate: function(value) {
					if (isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}
		]).then(function(answer) {
		console.log(answer.choice)
		parseInt(answer);
		console.log(answer);
		console.log(res.stock_quantity);
		connection.query("SELECT stock_quantity FROM products WHERE item_id = '" + answer.choice + "'", function(err, res) {
			if (err) throw err;
			if (answer.howMany < res[0].stock_quantity) {
				console.log("Congratulations on your purchase!");
				// buySomethingElse();
			}
			else {
				console.log("We're sorry but we cannot fullfill your order: Insufficient Quantity");
				// buySomethingElse();
			}
		})
		});
		
		});
		
		}
start()
