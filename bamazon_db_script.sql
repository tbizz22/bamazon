CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,4) NULL,
    stock_quantity INT NULL,
    product_sales DECIMAL(10,4) DEFAULT 0.0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
Values  ("AUKEY Car Phone Mount", "Mobile Accessories", 3.99, 100, 0),
		("AmazonBasics Lightning to USB A", "Mobile Accessories", 6.99, 100, 0),
        ("AmazonBasics USB C to USB A ", "Mobile Accessories", 10.99, 100, 0),
        ("Screen Protector", "Mobile Accessories", 8.99, 100, 0),
        ("Sandisk Ultra 64GB Micro SDXC", "Mobile Accessories", 30.99, 100, 0),
        ("Sandisk Ultra 32GB Micro SDXC", "Mobile Accessories", 26.99, 100, 0),
        ("Fallout 76", "Video Games", 59.99, 100, 0),
        ("Far Cry 5", "Video Games", 59.99, 100, 0),
        ("SpiderMan", "Video Games", 59.99, 100, 0),
        ("Titanfall 2", "Video Games", 59.99, 100, 0);
        
