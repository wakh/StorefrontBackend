# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `/products` (Get)
> Return: `[{id: Product ID, name: Product name, price: Price, category: Category}, ...]` (JSON)
- Show: `/products/[Product_ID]` (Get)
> Return: `{id: Product ID, name: Product name, price: Price, category: Category}` (JSON)
- Create (token required): `/products` (Post)<br/>
Body: `name` = Product name, `price` = Price, `category` = Category
> Return: `{id: Product ID, name: Product name, price: Price, category: Category}` (JSON)
- Top 5 most popular products: `/products/topfive` (Get)
> Return: `[{product_id: Product ID, quantity: Total sold quantity}, ...]` (JSON)
- Products by category: `/products/category/[Category]` (Get)
> Return: `[{id: Product ID, name: Product name, price: Price, category: Category}, ...]` (JSON)

#### Users
- Index (token required): `/products` (Get)
> Return: `[{id: Username, password: Password, firstName: First Name, lastName: Last Name}, ...]` (JSON)
- Show (token required): `/products/[Username]` (Get)
> Return: `{id: Username, password: Password, firstName: First Name, lastName: Last Name}` (JSON)
- Create (token required): `/products` (Post)<br/>
Body: `id` = Username, `password` = Password, `firstName` = First Name, `lastName` = Last Name
> Return: Token with encrypted json data<br/> `{id: Username, password: Hashed Password, firstName: First Name, lastName: Last Name}`

#### Orders
- Current Order by user (token required): `/orders/current/[Username]` (Get)
> Return: `{id: Order ID, user_id: Username, status: Status}` (JSON)
- Completed Orders by user (token required): `orders/completed/[Username]` (Get)
> Return: `[{id: Order ID, user_id: Username, status: Status}, ...]` (JSON)

## Data Shapes
#### Product
-  id : Integer
- name : Varchar
- price : Integer
- category : Varchar

#### User
- id : Varchar
- firstName : Varchar
- lastName : Varchar
- password : Varchar

#### Orders
- id : Varchar
- user_id : Varchar
- status : TRUE = completed, FALSE = active

#### Order_Products
- order_id : Integer
- product_id : Integer
- quantity : Integer
