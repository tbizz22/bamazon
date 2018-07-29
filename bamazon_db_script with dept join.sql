CREATE DATABASE bamazon_db_dept;

USE bamazon_db_dept;

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(50) NOT NULL,
overhead_costs INT NOT NULL,
PRIMARY KEY (department_id)
);


CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_id INT NOT NUll,    
    price DECIMAL(10,4) NULL,
    stock_quantity INT NULL,
    product_sales DECIMAL(10,4) default 0,
    PRIMARY KEY (item_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);



INSERT INTO departments (department_id, department_name, overhead_costs)
Values (1, "Mobile Accessories", 1500),
	   (2, "Video Games", 2000);

INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales)
Values  ("AUKEY Car Phone Mount", 1, 3.99, 100, 0),
		("AmazonBasics Lightning to USB A", 1, 6.99, 100, 15444),
        ("AmazonBasics USB C to USB A ", 1, 10.99, 100, 2344),
        ("Screen Protector", 1, 8.99, 100, 0),
        ("Sandisk Ultra 64GB Micro SDXC", 1, 30.99, 100, 324442),
        ("Sandisk Ultra 32GB Micro SDXC", 1, 26.99, 100, 0),
        ("Fallout 76", 2, 59.99, 100, 0),
        ("Far Cry 5", 2, 59.99, 100, 2342),
        ("SpiderMan", 2, 59.99, 100, 1231),
        ("Titanfall 2", 2, 59.99, 100, 0);       



