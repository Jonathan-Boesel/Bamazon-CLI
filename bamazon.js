var inquirer = require("inquirer");

var mysql = require("mysql");

var customer = require("bamazonCustomer.js")

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

function afterConnection() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
		if (err) throw err;
		console.table(res);
		start()

		// connection.end();
	});
}
