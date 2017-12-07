-- Add/Drop
DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(30) NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dishwasher", "Appliances", 200.50, 20), ("Refrigerator", "Appliances", 399.99, 15), ("Xbox One", "Electronics", 299.99, 45), ("Lamp", "Home Decor", 59.99, 65), ("Ceiling Fan", "Home Decor", 175.55, 35), ("HD TV", "Electronics", 499.99, 15), ("Headphones", "Electronics", 40.00, 65), ("Microwave", "Appliances", 199.99, 20), ("HDMI Cord", "Electronics", 26.60, 150)