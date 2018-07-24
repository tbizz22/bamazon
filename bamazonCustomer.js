// bamazonCustomer.js


// get the libraries
var inquirer = require("inquirer");
var mysql = require("mysql");


// connection Data

var connection = mysql.createConnection({
    host: "localhost",
    port: 4000,
    user: "root",
    password: "Root!",
    database: "bamazon_db"
});

var divider = "\n_____________________________________________________\n"





openConnection();

function openConnection() {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + divider);
        showStock();
    });
}

function showStock() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var iChoices = [];
        console.log("Below is a list of our Inventory:");
        

        for (var i = 0; i < res.length; i++) {
            var id = res[i].item_id;
            var pn = res[i].product_name;
            var price = res[i].price;

            iChoices.push(id + " - " + pn);
            console.log("ID: " + id + " | Product: " + pn + " | Price: $" + price);
        }
        console.log(divider);
        // This is breaking everything :(
        // connection.end();        
        placeOrder(iChoices);
    });
}

function placeOrder(choice) {
    inquirer.prompt(
        [{
        type: "list",
        message: "Which product would you like to purchase?",
        choices: choice,
        name: "choice"
    }]
).then(function (res) {

        var choice = res.choice.split(" - ", 2);
        var id = choice[0];
        var product = choice[1];

        console.log(product + " - Great Choice.")
        inquirer.prompt([{
            type: "input",
            message: "How many many would you like to order?",
            name: "count"
        }]).then(function (res) {
            var requestedQuant = res.count;
            console.log("Filling your order...");
            // check to see if enough stock exists
            getInventory(id, requestedQuant);

        })

    })
}


function getInventory(itemID, requestedQuant) {
    var availableQuant;
    var query = connection.query(
        "SELECT stock_quantity FROM products WHERE ?", {
            item_id: itemID
        },
        function (err, res) {
            if (err) throw err;
            availableQuant = res[0].stock_quantity;
            checkOrder(itemID, requestedQuant, availableQuant)
        }
    );
}

function getPrice(itemID, rQuant) {
    var price;
    var query = connection.query(
        "SELECT price FROM products WHERE ?", {
            item_id: itemID
        },
        function (err, res) {
            if (err) throw err;
            unitCost = res[0].price;
            var price = unitCost * rQuant;
            console.log("Thank you for purchasing. Your order total is $" + price + ".");
        }
    );
}


function checkOrder(id, rQuant, aQuant) {
    if (aQuant < rQuant) {
        console.log("We're sorry your order can not be completed. Please try again with fewer items in your cart. \nCurrent Stock: " + aQuant);
        console.log(divider);
        showStock();
    } else {
        aQuant = aQuant - rQuant
        // This can happen async since nothing is getting returned
        UpdateInventory(id, aQuant);
        getPrice(id, rQuant);
        // reset the experience
        showStock();
    }
}


function UpdateInventory(id, aQuant) {
    // The right way to do this is to get the value and update the total. This prevents very slow race conditions....The lazy way is to just pass in the new value...which is what im doing.
    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: aQuant
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            if (err) throw err;
        }
    );
}