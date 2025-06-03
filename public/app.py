# import fastapi package
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from database.session import get_db
from database.customers import Customers
from database.brands import Brands
from database.category import Categories
from database.products import Products
from database.purchaseitems import PurchaseItems
from database.purchases import Purchases
from database.salesitems import Sales_Items
from database.sales import Sales
from database.trash import Trash

from schemas import (
    BrandSchema,
    CategorySchema,
    CustomerSchema,
    ProductsSchema,
    PurchaseItemsSchema,
    PurchasesSchema,
    SalesItemsSchema,
    SalesSchema,
)

# initialize
app = FastAPI()
# allow network request from all servers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# http://localhost:8000/productsdata
@app.get("/productsdata")
def products(
    brand_id: int = None, category_id: int = None, session: Session = Depends(get_db)
):
    query = session.query(Products)
    if brand_id:
        query = query.filter(Products.brand_id == brand_id)
        # products = session.query(Products).filter(Products.brand_id == brand_id).all()
    if category_id:
        query = query.filter(Products.category_id == category_id)
        # products = session.query(Products).filter(Products.category_id == category_id).all()
    # else:
    #     products = session.query(Products).all()

    products = query.all()  # call .all only once after all the filtering is complete

    # return products

    print({"message": "products retrieved successfully"})
    return {"message": "Product Created Successfully", "product": products}


# http://localhost:8000/newproducts
@app.post("/newproducts")
def add_products(product: ProductsSchema, db: Session = Depends(get_db)):
    new_product = Products(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

    # return {"message": "Product Created Successfully", "product": new_product}


# `http://localhost:8000/productsdata/${id}`
@app.delete("/productsdata/{id}")  # get product by id
def delete_product(id: int, db: Session = Depends(get_db)):
    # retrieve a specific product by it's id using .get
    product = db.get(Products, id)
    # get the product
    # product = db.query(Products).filter(Products.id == product_id).first()
    if not product:
        return {"success": False, "message": "Product not found"}
    if product.is_deleted:
        return {"message": "Product no longer exist, check in Trash"}
    # soft deleting, set is_deleted = True to mark the product as deleted
    product.is_deleted = True

    # cretaing a trash entry
    deleted = Trash(product_id=product.id, deleted_at=datetime.now())
    db.add(deleted)
    db.flush()
    db.commit()
    return {"message": "Product moved to trash", "deleted": deleted}


# http://localhost:8000/categorydata"
@app.get("/categorydata")
def category(session: Session = Depends(get_db)):
    categorydata = session.query(Categories).all()
    print({"message": "categorydata retrieved successfully"})
    return categorydata


# http://localhost:8000/newcategory"
@app.post("/newcategory")
def add_categories(category: CategorySchema, db: Session = Depends(get_db)):
    new_category = Categories(**category.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    print({"message": "category created successfully"})
    return new_category


# http://localhost:8000/branddata
@app.get("/branddata")
def brand(session: Session = Depends(get_db)):
    branddata = session.query(Brands).all()
    print({"message": "branddata retrieved successfully"})
    return branddata


# http://localhost:8000/newbrand
@app.post("/newbrand")
def add_brands(brand: BrandSchema, db: Session = Depends(get_db)):
    new_brand = Brands(**brand.model_dump())
    db.add(new_brand)
    db.commit()
    db.refresh(new_brand)
    print({"message": "New brand created successfully"})
    return new_brand


# http://localhost:8000/customerdata
@app.get("/customerdata")
def customer(session: Session = Depends(get_db)):
    customerdata = session.query(Customers).all()
    print({"message": "Customerdata retrieved successfully"})
    return customerdata


# http://localhost:8000/newcustomer
@app.post("/newcustomer")
def add_customer(customer: CustomerSchema, db: Session = Depends(get_db)):
    new_customer = Customers(**customer.model_dump())
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    print({"message": "New customer created successfully"})
    return new_customer


# http://localhost:8000/purchaseitemsdata"
@app.get("/purchaseitemsdata")
def purchaseitems(session: Session = Depends(get_db)):
    purchaseitemsdata = session.query(PurchaseItems).all()
    print({"message": "purchaseitemsdata retrieved successfully"})
    return purchaseitemsdata


# http://localhost:8000/purchaseitems"
@app.post("/purchaseitems")
def add_purchaseitems(
    purchaseitems: PurchaseItemsSchema, db: Session = Depends(get_db)
):
    new_purchaseitems = PurchaseItems(**purchaseitems.model_dump())
    db.add(new_purchaseitems)
    db.commit()
    db.refresh(new_purchaseitems)
    print({"message": "newpurchaseitems created successfully"})
    return new_purchaseitems


# http://localhost:8000/purchasedata"
@app.get("/purchasedata")
def purchases(session: Session = Depends(get_db)):
    purchasedata = session.querry(Purchases).all()
    return purchasedata


# create a purchase
# http://localhost:8000/purchases"
@app.post("/purchases")
def create_purchases(purchases: PurchasesSchema, db: Session = Depends(get_db)):
    # calculate total cost
    total_cost = sum(item.quantity_added * item.unit_cost for item in purchases.items)
    # Create purchase record
    db_purchase = Purchases(note=purchases.note, total_cost=total_cost)
    # Add purchase items
    for item in purchases.items:
        db_item = PurchaseItems(
            product_id=item.product_id,
            quantity_added=item.quantity_added,
            unit_cost=item.unit_cost,
        )
        db_purchase.items.append(db_item)

    # Commit to database
    db.add(db_purchase)
    db.commit()
    # new_purchases = Purchases(**purchases.model_dump())
    # db.add(new_purchases)
    # db.commit()
    # db.refresh(new_purchases)
    # return new_purchases


# http://localhost:8000/salesitemsdata"
@app.get("/saleitemsdata")
def sales_items(session: Session = Depends(get_db)):
    salesitemsdata = session.querry(Sales_Items).all()
    return salesitemsdata


# http://localhost:8000/salesitems"
@app.post("/salesitems")
def add_sales_items(
    salesitemsvalidate: SalesItemsSchema, db: Session = Depends(get_db)
):
    new_sales_items = Sales_Items(**salesitemsvalidate.model_dump())
    db.add(new_sales_items)
    db.commit()
    db.refresh(new_sales_items)
    return new_sales_items


# http://localhost:8000/salesdata"
@app.get("/salesdata")
def sales(session: Session = Depends(get_db)):
    salesdata = session.querry(Sales).all()
    return salesdata


# http://localhost:8000/sales"
@app.post("/sales")
def add_sales(salesvalidate: SalesSchema, db: Session = Depends(get_db)):
    new_sales = Sales(**salesvalidate.model_dump())
    db.add(new_sales)
    db.commit()
    db.refresh(new_sales)
    return new_sales
