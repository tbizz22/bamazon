// bamazonManager.js



// get the libraries
var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require('console.table');


// connection Data

var connection = mysql.createConnection({
    host: "localhost",
    port: 4000,
    user: "root",
    password: "Root!",
    database: "bamazon_db"
});

var divider = "\n_____________________________________________________\n"

// product constructor
var ProductGrid = function (id, name, dept, stock, price) {
    this.id = id;
    this.name = name;
    this.stock_quantity = stock;
    this.price = price;
    this.dept = dept;
}

// this starts the flow through the app
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
            lowInventory();

        } else if (res.choice === "Add to Inventory") {
            updateStock();

        } else if (res.choice === "Add New Product") {
            createProduct();

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
        console.log(divider + "Below is a list of our Inventory:\n");
        console.table(res);
        cont();
    });
}


function lowInventory() {
    var query = connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5",
        function (err, res) {
            console.table(res);
            cont();
        }
    );
}


function updateStock() {
    var item;
    var currStock;
    inquirer.prompt(
        [{
            type: "input",
            message: "Which product ID would you like to change the stock for?",
            name: "itemid"
        }]
    ).then(function (res) {
        item = res.itemid
        var query = connection.query(
            "SELECT * FROM products WHERE ?", {
                item_id: item
            },
            function (err, res) {
                if (err) throw err;
                currStock = res[0].stock_quantity;
                console.table(res);

                inquirer.prompt([{
                    type: "input",
                    message: "How many many would you like to order?",
                    name: "count"

                }]).then(function (res) {
                    currStock = parseInt(currStock) + parseInt(res.count);
                    UpdateInventory(item, currStock)
                    cont();
                })
            })
    })
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



function createProduct() {
    var id;
    connection.query("SELECT item_id FROM products ORDER BY item_id DESC LIMIT 1",
        function (err, res) {
            if (err) throw err;
            id = parseInt(res[0].item_id) + 1;

            inquirer.prompt([{
                    name: "product",
                    message: "What is the product you wish to create?"
                },
                {
                    name: "dept",
                    message: "What department is this product In?"
                },
                {
                    name: "price",
                    message: "What is the price?"
                },
                {
                    name: "stock",
                    message: "How many units are you starting with?"
                }

            ]).then(function (res) {
                var product = new ProductGrid(id, res.product, res.dept, res.stock, res.price)
                addProductToDB(product);
                cont();
            })
        })
}


function addProductToDB(product) {
    console.log("Inserting a new product...\n");
    var query = connection.query(
        "INSERT INTO products SET ?", {
            item_id: product.id,
            product_name: product.name,
            price: product.price,
            department_name: product.dept,
            stock_quantity: product.stock_quantity
        },
        function (err, res) {
            console.log(res.affectedRows + " product inserted!\n");

        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function cont() {
    inquirer
        .prompt({
            type: "confirm",
            message: "Would you like to perform another action?",
            name: "confirm",
            default: true
        })
        .then(function (res) {
            if (res.confirm) {
                showManagerMenu()
            } else {
                console.log("\nPlease come back when you are ready. \n");
                process.exit();
            }
        })
};