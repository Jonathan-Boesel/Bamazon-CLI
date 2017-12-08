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

function start() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
		if (err) throw err;
		console.table(res);
		customer()

		// connection.end();
	});
}

function reset() {
	inquirer.prompt([{
		type: "list",
		name: "answer",
		message: "Would you like to buy something else?",
		choices: ["YES", "NO"]
	}]).then(function(userInput) {
		switch (userInput.answer) {
			case "NO":
				console.log("Thanks for visiting BAMAZON, have a great day!!");
				connection.end();
				break;
			case "YES":
				connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
					if (err) throw err;
					console.table(res);
					customer()
				});
				break;
		}
	});
}

function customer() {
	inquirer.prompt([{
			type: "input",
			name: "itemID",
			message: "Please select a Item ID..."
		},
		{
			type: "input",
			name: "quantity",
			message: "How many would you like to buy?"
		}
	]).then(function(userInput) {
		var tmpRes;
		connection.query("SELECT stock_quantity FROM products WHERE item_id = '" + userInput.itemID + "'", function(err, res) {
			if (err) throw err;
			tmpRes = res[0].stock_quantity;
			// console.log(res[0].stock_quantity);

			// }).then(function(tmpRes) {
			if (tmpRes > userInput.quantity) {
				// console.log("Theres enough")
				updateListing(tmpRes, userInput)

			}
			else {
				console.log("Not enough stock!!")
			}
		})

	})
}

function updateListing(tmpRes, userInput) {
	// console.log(tmpRes - userInput.quantity)
	var query = connection.query(
		"UPDATE products SET ? WHERE ?", [{
				stock_quantity: tmpRes - userInput.quantity
			},
			{
				item_id: userInput.itemID
			}
		],
		function(err, res) {
			if (err) throw err;
			connection.query("SELECT price FROM products WHERE ?", [{
				item_id: userInput.itemID
			}], function(err, res) {
				if (err) throw err;
				console.log("Thank you for ordering! Your price is: $" + (res[0].price * userInput.quantity));
				reset()
			})
			console.log(res.affectedRows + " product updated!\n");
		}
	);
}

module.exports = {
	start: start
}
