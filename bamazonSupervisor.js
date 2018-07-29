// bamazonSupervisor.js



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
    database: "bamazon_db_dept"
});

var divider = "\n_____________________________________________________\n"


// this starts the flow through the app
openConnection();

function openConnection() {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + divider);
        showSupervisorMenu();
    });
}


function showSupervisorMenu() {
    greetSupervisor();
    
    var choice = [
        "View Product Sales by Department",
        "Create New Department - Not Implemented"
    ];

    inquirer.prompt(
        [{
            type: "list",
            message: "What supervisorial type things would you like to do?",
            choices: choice,
            name: "choice"
        }]
    ).then(function (res) {
        if (res.choice === "View Product Sales by Department") {
            viewProdSalesbyDept();

        } else if (res.choice === "Create New Department - Not Implemented") {
            console.log("We're Still working on this feature. Please try something else");
            cont();

        } else {
            console.log("Something went wrong" + divider);
            showSupervisorMenu();
        }
    })
}


function greetSupervisor() {
    console.log("Hello there Mr. Supervisor." + divider);
}


function viewProdSalesbyDept() {
    connection.query("select d.department_id 'Department ID', d.department_name 'Department' , sum(p.product_sales) as 'Total Sales' , d.overhead_costs as 'Overhead Costs', (sum(p.product_sales)- d.overhead_costs) as 'Total Profit' from departments d join products p on d.department_id = p.department_id group by d.department_id"
    , function (err, res) {
        if (err) throw err;
        console.log(divider + "Product Sales by Department:\n");
        console.table(res);
        cont();
    });
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