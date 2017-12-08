# Bamazon-CLI

When node bamazon.js is loaded a prompt is initialized

The user is asked if they are a customer, manager, or supervisor and the appropriate program file started. (Images/snip1.PNG)

When customer is selected, the user is shown a list of available products and prompted to enter which they would like to buy (Images/snip2.PNG), then how many. The database table is updated (Images/snip3.PNG) (Images/snip4.PNG), then the user is thanked and shown a readout of their cost (Images/snip5.PNG). They are then prompted if they would like to buy another item.

When manager is selected, the user is given a list of options (Images/snip6.PNG). When View Products for Sale is selected the user is given the manager version of the table (Images/snip7.PNG). When View Low Inventory is selected the user is given a table of rows with low inventory (Images/snip8.PNG). When Add to Inventory is selected the user is prompted to input which item ID and how many units they are adding (Images/snip9.PNG) and the database table is updated (Images/snip10.PNG). If Add new Product is selected the user is given a series of prompts to input the product name, a list of available departments populated dynamically from the database – in case the superviser adds a new department – and the cost and quantity they wish to input (Images/snip11.PNG). The database table is updated with a new row representing their new product (Images/snip12.PNG)
