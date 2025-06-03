import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// const validationSchema = z.object({
//   items: z.array(purchaseItemSchema).min(1, "At least one item is required"),
// });

const initialdata = {
  product_name: "",
  sku: "",
  unit_cost: 0,
  quantity: 1,
};

const PurchaseTable = () => {
  // Initial data state
  const [purchases, setPurchases] = useState([
    {
      id: 1,
      product_name: "Premium Coffee Mug",
      unit_cost: 12.99,
      quantity: 5,
    },
    {
      id: 2,
      product_name: "Wireless Headphones",
      unit_cost: 59.99,
      quantity: 3,
    },
    { id: 3, product_name: "Desk Lamp", unit_cost: 24.5, quantity: 2 },
  ]);

  // const [purchases, setPurchases] = useState([initialdata])

  // useEffect(() => {
  //   fetch("http://localhost:8000/purchasedata") //get the endpoint of the fetched data
  //     .then((res) => res.json())
  //     .then((data) => setPurchases(data));
  // }, []);

  // Add new purchase
  const addPurchase = () => {
    const newPurchase = {
      id: purchases.length + 1,
      product_name: "",
      unit_cost: 0,
      quantity: 1,
    };
    setPurchases([...purchases, newPurchase]);
  };

  // Handle input changes
  const handleChange = (id, field, value) => {
    setPurchases(
      purchases.map((purchase) =>
        purchase.id === id ? { ...purchase, [field]: value } : purchase
      )
    );
  };

  // Calculate line total
  const calculateLineTotal = (unit_cost, quantity) => {
    return (parseFloat(unit_cost) || 0) * (parseInt(quantity) || 0);
  };

  // Calculate grand total
  const grandTotal = purchases.reduce((total, purchase) => {
    return total + calculateLineTotal(purchase.unit_cost, purchase.quantity);
  }, 0);

  return (
    <div className="min-h-screen px-9 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 bg-[#EAEFEF]">
      <div className="flex justify-between shadow-lg">
        <h2 className="flex justify-start text-2xl font-bold text-[#333446] mb-4">
          Purchase Items
        </h2>
        <nav className="flex gap-4 justify-end pr-2 pb-2">
          <button className="px-4 py-2 bg-[#333446] text-[#EAEFEF] rounded hover:bg-[#B8CFCE] hover:text-[#333446] focus:outline-none focus:ring-2 focus:ring-[#333446]">
            <Link to={"/home"}>Home</Link>
          </button>
          <button className="px-4 py-2 bg-[#333446] text-[#EAEFEF] rounded hover:bg-[#B8CFCE] hover:text-[#333446] focus:outline-none focus:ring-2 focus:ring-[#333446]">
            <Link to={"/setproduct"}>Manage Stock</Link>
          </button>
          <button className="px-4 py-2 bg-[#333446] text-[#EAEFEF] rounded hover:bg-[#B8CFCE] hover:text-[#333446] focus:outline-none focus:ring-2 focus:ring-[#333446]">
            <Link to={"/billing"}>Billing</Link>
          </button>
        </nav>
      </div>

      <div className="overflow-x-auto border-l border-r border-[#B8CFCE]">
        <table className="min-w-full bg-[#EAEFEF] rounded-lg overflow-hidden">
          <thead className="bg-[#EAEFEF] text-[#EAEFEF]">
            <tr>
              <th className="py-3 px-4 text-left font-semibold bg-[#333446]">
                Product Name
              </th>
              <th className="py-3 px-4 text-right font-semibold bg-[#333446]">
                Unit Cost (KES)
              </th>
              <th className="py-3 px-4 text-right font-semibold bg-[#333446]">
                Quantity
              </th>
              <th className="py-3 px-4 text-right font-semibold bg-[#333446]">
                Total (KES)
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#7F8CAA]">
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={purchase.product_name}
                    onChange={(e) =>
                      handleChange(purchase.id, "product_name", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product"
                  />
                </td>

                <td className="py-3 px-4 text-right">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={purchase.unit_cost}
                    onChange={(e) =>
                      handleChange(purchase.id, "unit_cost", e.target.value)
                    }
                    className="w-24 p-2 border rounded text-right focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>

                <td className="py-3 px-4 text-right">
                  <input
                    type="number"
                    min="1"
                    value={purchase.quantity}
                    onChange={(e) =>
                      handleChange(purchase.id, "quantity", e.target.value)
                    }
                    className="w-20 p-2 border rounded text-right focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>

                <td className="py-3 px-4 text-right font-medium">
                  $
                  {calculateLineTotal(
                    purchase.unit_cost,
                    purchase.quantity
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-[#B8CFCE] border-t-2  border-b-2 border-[7F8CAA]">
            <tr>
              <td className="py-3 px-4 font-semibold text-right" colSpan="3">
                Grand Total:
              </td>
              <td className="py-3 px-4 text-right font-bold text-lg">
                ${grandTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4">
        <button
          onClick={addPurchase}
          className="px-4 py-2 bg-[#333446] text-[#EAEFEF] rounded hover:bg-[#B8CFCE] hover:text-[#333446] focus:outline-none focus:ring-2 focus:ring-[#333446]"
        >
          + Add Product
        </button>
      </div>
    </div>
  );
};

export default PurchaseTable;
