CREATE TABLE order_products (
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    PRIMARY KEY (order_id, product_id)
);