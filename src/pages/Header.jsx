import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="bg-[#333446] text-3xl text-center mb-8 flex flex-col justify-evenly shadow-lg">
        <h1 className="text-5xl text-[#B8CFCE] font-extrabold pt-4">
          Hardware Store Management System
        </h1>
        <nav className="flex gap-4 justify-end pr-10 pb-2 text-xl">
          <button className="px-4 py-2 bg-[#B8CFCE] text-[#333446]  font-semibold rounded transition-colors hover:text-blue-700">
            <Link to={"/setproduct"}>Manage Stock</Link>
          </button>
          <button className="px-4 py-2  bg-[#B8CFCE] text-[#333446]  font-semibold rounded transition-colors hover:text-blue-700">
            <Link to={"/purchasetable"}>Purchases</Link>
          </button>
          <button className="px-4 py-2  bg-[#B8CFCE] text-[#333446]  font-semibold rounded transition-colors hover:text-blue-700">
            <Link to={"/setproduct"}>Billing</Link>
          </button>
        </nav> 
      </header>
    </div>
  );
};

export default Header;
