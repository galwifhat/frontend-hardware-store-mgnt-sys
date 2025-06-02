import AddBrand from "./AddBrand";
import AddCategory from "./AddCategory";
import AddProducts from "./AddProduct";
import { Link } from "react-router-dom";

const SetProducts = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 bg-[#333446]">
      <nav className="flex gap-4 justify-end pr-2 pb-2">
        <button className="px-4 py-2 bg-[#B8CFCE] text-[#333446] rounded hover:bg-[#7F8CAA] focus:outline-none focus:ring-2 focus:ring-[#333446]">
          <Link to={"/home"}>Home</Link>
        </button>
        <button className="px-4 py-2 bg-[#B8CFCE] text-[#333446] rounded hover:bg-[#7F8CAA] focus:outline-none focus:ring-2 focus:ring-[#333446]">
          <Link to={"/purchasetable"}>Purchases</Link>
        </button>
        <button className="px-4 py-2 bg-[#B8CFCE] text-[#333446] rounded hover:bg-[#7F8CAA] focus:outline-none focus:ring-2 focus:ring-[#333446]">
          <Link to={"/billing"}>Billing</Link>
        </button>
      </nav>
      <AddBrand />
      <AddCategory />
      <AddProducts />
    </div>
  );
};

export default SetProducts;
