import { useState, useEffect } from "react";

const ProductSearch = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState("");

  //fetching brand when a page loads
  useEffect(() => {
    fetch("http://localhost:8000/branddata")
      .then((response) => response.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((err) => console.error("Failed to laod brands:", err));
  }, []);

  //fetching products when a page loads and when selected brand changes
  useEffect(() => {
    const url = selectedBrandId
      ? `http://localhost:8000/productsdata?brand_id=${selectedBrandId}`
      : "http://localhost:8000/productsdata";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Failed to laod products:", err));
  }, [selectedBrandId]);

  // Get selected brand name
  const selectedBrandName = brands.find(
    (b) => b.id.toString() === selectedBrandId
  )?.brand_name;

  return (
    <div>
      <h2>Product Search</h2>

      {/* Brand Selector */}
      <select
        value={selectedBrandId}
        onChange={(e) => setSelectedBrandId(e.target.value)}
      >
        <option value="">-- All Brands --</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.brand_name}
          </option>
        ))}
      </select>

      <p>
        <strong>Showing:</strong>{" "}
        {selectedBrandId ? selectedBrandName : "All Products"}
      </p>

      {/* Product Table */}
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const brand = brands.find((b) => b.id === product.brand_id);
              return (
                <tr key={product.id}>
                  <td>{product.product_name}</td>
                  <td>{brand ? brand.brand_name : "Unknown"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductSearch;
