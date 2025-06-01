import { useState, useEffect } from "react";
import AddBrand from "./pages/AddBrands";
import AddCategory from "./pages/AddCategory";
import AddProducts from "./pages/AddProducts";
import Footer from "./pages/Footer";

function App() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  //connect
  //fetching data
  useEffect(() => {
    fetch("http://localhost:8000/productsdata")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []); // this only runs once

  return (
    <>
      <AddBrand />
      <AddCategory />
      <AddProducts />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              className="w-full h-48 object-contain"
              height={300}
              width={200}
              src={product.image_url}
              alt={product.product_name}
            />
            <h3 className="font-bold text-lg truncate">
              {product.product_name}
            </h3>
            <h3 className="text-gray-600">SKU: {product.sku}</h3>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
