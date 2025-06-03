### Hardware Store Management System

- https://frontend-hardware-store-mgnt-sys.onrender.com/home

## Owner

Developed and maintained by myself!

## Setup Instructions

## Prerequisites

### Softwares, Tools and Technologies

- HTML
- CSS - Tailwind css
- React-JS (VUE)
- Python
- FastAPI
- SQLAlchemy ORM
- SQL
- VS-CODE
- Github actions
- Hosted on render
- Alembic
- Mogrations

### Steps to Run the App

- Create a directory and inside that directory:

- git clone https://github.com/galwifhat/backend-hardware-store-mgnt-sys

- git clone https://github.com/galwifhat/backend-hardware-store-mgnt-sys

- cd to frontend-name
- npm install
- npm start or npm run dev (vue)
  _You can modify these commands to match your tech stack._

### Features

- Real-time product filtering
- Soft delete functionality
- Stock Management (adding, removing)

### Key relationships in my system

- One-to-Many (Most Common)
- Many-to-One
- Many-to-many (I am not implementing this for now)

- I will use back_populates/backref for the bidirectional relationships

### A Brand has many Products (one-to-many)

- one brand can have many products
- so, in the brand Model, we can have a relationship to Products -> foreignkey

### A Category has many Products (one-to-many)

- a relationship to Product -> foreign key

### A Purchase has many PurchaseItems (one-to-many)

- one Purchase can have many PurchaseItems
- in Purchase model - define a rlshp to Purchase Item

### A Sale has many SaleItems (one-to-many)

- one Sale can have many salesItems -> rlshp to SaleItems

### A Product has many PurchaseItems and many SaleItems (one-to-many)

- have a rlshp to both salesItems and PurchaseItems

### Query Relationships

- Get all products for a brand
- Get all products for a category
- Get brand from a product
- Get category from a product

### Operations (CRUD) between tables

- Create - POST
- Read - GET
- Update - PATCH/PUT
- Delete -DELETE
