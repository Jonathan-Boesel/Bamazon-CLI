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
	console.log("connected as id " + connection.threadId);

});

function start() {
	inquirer.prompt([{
		type: "list",
		name: "answer",
		message: "What would you like to do?",
		choices: [
			{ value: "ONE", name: "View Products for Sale" },
			{ value: "TWO", name: "View Low Inventory" },
			{ value: "THREE", name: "Add to Inventory" },
			{ value: "FOUR", name: "Add New Product" },
			{ value: "FIVE", name: "Nothing" }
		]
	}]).then(function(userInput) {
		switch (userInput.answer) {
			case "ONE":
				connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
					if (err) throw err;
					console.table(res);
					reset()
				});
				break;
			case "TWO":
				connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res) {
					if (err) throw err;
					console.table(res);
					reset()
				});
				break;
			case "THREE":
				inquirer.prompt([{
						type: "input",
						name: "itemID",
						message: "Which item ID?"
					},
					{
						type: "input",
						name: "addQuantity",
						message: "How many will you add?"
					}
				]).then(function(userInput) {
					var tmpRes;
					connection.query("SELECT stock_quantity FROM products WHERE item_id = '" + userInput.itemID + "'", function(err, res) {
						if (err) throw err;
						tmpRes = res[0].stock_quantity
						updateListing(tmpRes, userInput)
					});
				});
				break;
			case "FOUR":
				inquirer.prompt([{
						type: "input",
						name: "name",
						message: "Item name:"
					},
					{
						type: "list",
						name: "depoName",
						message: "Department name:",
						choices: ["Appliances", "Home Decor", "Electronics"]
					},
					{
						type: "input",
						name: "price",
						message: "Price:"
					},
					{
						type: "input",
						name: "quantity",
						message: "Quantity:"
					}
				]).then(function(userInput) {
					createProduct(userInput);
				});
				break;
			case "FIVE":
				connection.end()
		}
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
				console.log("Have a great day!!");
				connection.end();
				break;
			case "YES":
				start();
				break;
		}
	});
}

function updateListing(tmpRes, userInput) {
	console.log(parseInt(tmpRes, 10) + parseInt(userInput.addQuantity, 10));
	var query = connection.query(
		"UPDATE products SET ? WHERE ?", [{
				stock_quantity: parseInt(tmpRes, 10) + parseInt(userInput.addQuantity, 10)
			},
			{
				item_id: userInput.itemID
			}
		],
		function(err, res) {
			if (err) throw err;
			console.log(res.affectedRows + " product updated!\n");
			reset();
		}
	);
}

function createProduct(userInput) {
	console.log("Inserting a new product...\n");
	var query = connection.query(
		"INSERT INTO products SET ?", {
			product_name: userInput.name,
			department_name: userInput.depoName,
			price: userInput.price,
			stock_quantity: userInput.quantity
		},
		function(err, res) {
			if (err) throw err;
			console.log(res.affectedRows + " product inserted!\n");
			reset()
		}
	);

}

module.exports = {
	start: start
}
