// bamazonManager.js



// get the libraries
var inquirer = require("inquirer");
var mysql = require("mysql");


// connection Data

var connection = mysql.createConnection({
    host: "localhost",
    port: 4000,
    user: "root",
    password: "Lost4566!",
    database: "bamazon_db"
});

var divider = "\n_____________________________________________________\n"





openConnection();

function openConnection() {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + divider);
        showManagerMenu();
    });
}


function showManagerMenu() {
    greetManager();
    var choice = [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ];

    inquirer.prompt(
        [{
            type: "list",
            message: "What managerial things would you like to do?",
            choices: choice,
            name: "choice"
        }]
    ).then(function (res) {
        if (res.choice === "View Products for Sale") {
            showStock()

        } else if (res.choice === "View Low Inventory") {
            console.log(res);

        } else if (res.choice === "Add to Inventory") {
            console.log(res);

        } else if (res.choice === "Add New Product") {
            console.log(res);

        } else {
            console.log("Something went wrong" + divider);
            showManagerMenu();
        }
    })
}


function greetManager() {
    console.log("Hello there Mr. Manager." + divider);
}


function showStock() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var iChoices = [];
        console.log("Below is a list of our Inventory:");
        console.log(res);

    });
}
