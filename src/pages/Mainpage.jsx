import Header from "./Header";
import Footer from "./Footer";

const Mainpage = () => {

  const [products, setProducts] = useState([]);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    //on load -> branddata
    fetch("http://localhost:8000/branddata")
      .then((response) => response.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((err) => console.error("Failed to laod brands:", err));

    //on load -> categorydata
    fetch("http://localhost:8000/categorydata")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Failed to laod Categoriess:", err));
  }, []);

  //fetch for products
  useEffect(() => {
    let url = "http://localhost:8000/productsdata";

    const params = new URLSearchParams();
    if (selectedBrandId) params.append("brand_id", selectedBrandId);
    if (selectedCategoryId) params.append("category_id", selectedCategoryId);

    if (params.toString()) {
      url += "?" + params.toString();
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Failed to laod products:", err));
  }, [selectedBrandId, selectedCategoryId]);

  // Get selected brand name
  const selectedBrandName = brands.find(
    (b) => b.id.toString() === selectedBrandId
  )?.brand_name;

  // Get selected category name
  const selectedCategoryName = brands.find(
    (b) => b.id.toString() === selectedBrandId
  )?.brand_name;

  return (
    <>
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8">
        <Header />
        <div className="flex">
          <select
            value={selectedBrandId}
            onChange={(e) => setSelectedBrandId(e.target.value)}
          >
            <option value="" className="px-5 align-middle">
              All Brands
            </option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brand_name}
              </option>
            ))}
          </select>

          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        {products.length > 0 ? (
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
                <button className="font-bold text-lg text-red-500">
                  Delete
                </button>
                <br />
                <button className="font-bold text-lg text-green-500">
                  Buy
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
        <Footer />
      </div>
    </>
  );
}

export default Mainpage