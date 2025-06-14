import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

//Zod Schema
const purchaseItemSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  unit_cost: z.number().min(0.01, "Must be at least KES 0.01"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

const formSchema = z.object({
  items: z.array(purchaseItemSchema).min(1, "At least one item is required"),
});

const PurchaseTable = () => {
  // Initialize Form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [{ product_name: "", unit_cost: 0, quantity: 1 }],
    },
  });

  // Manage Dynamic Fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Submit Handler
  const onSubmit = (data) => {
    console.log("Valid data:", data);
  };

  // Calculate Totals
  //line total
  const calculateLineTotal = (index) => {
    const item = fields[index];
    return (item?.unit_cost || 0) * (item?.quantity || 0);
  };
  //grand total
  const grandTotal = fields.reduce((total, _, index) => {
    return total + calculateLineTotal(index);
  }, 0);

  return (
    <div className="min-h-screen px-9 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 bg-[#EAEFEF]">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  Line Total (KES)
                </th>
                <th className="py-3 px-4 text-right font-semibold bg-[#333446]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#7F8CAA]">
              {fields.map((field, index) => (
                <tr key={field.id} className="hover:bg-gray-50">
                  {/* Product Name */}
                  <td className="py-3 px-4">
                    <Controller
                      name={`items.${index}.product_name`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className={`w-full p-2 border rounded ${
                            errors.items?.[index]?.product_name
                              ? "border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          placeholder="Enter product"
                        />
                      )}
                    />
                    {errors.items?.[index]?.product_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.items[index].product_name.message}
                      </p>
                    )}
                  </td>

                  {/* Unit Cost */}
                  <td className="py-3 px-4 text-right">
                    <Controller
                      name={`items.${index}.unit_cost`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          step="0.01"
                          min="0.01"
                          className={`w-24 p-2 border rounded text-right ${
                            errors.items?.[index]?.unit_cost
                              ? "border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      )}
                    />
                    {errors.items?.[index]?.unit_cost && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.items[index].unit_cost.message}
                      </p>
                    )}
                  </td>

                  {/* Quantity */}
                  <td className="py-3 px-4 text-right">
                    <Controller
                      name={`items.${index}.quantity`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          min="1"
                          className={`w-20 p-2 border rounded text-right ${
                            errors.items?.[index]?.quantity
                              ? "border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      )}
                    />
                    {errors.items?.[index]?.quantity && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.items[index].quantity.message}
                      </p>
                    )}
                  </td>

                  {/* Total */}
                  <td className="py-3 px-4 text-right font-medium">
                    ${calculateLineTotal(index).toFixed(2)}
                  </td>

                  {/* Remove Button */}
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-4 py-2 rounded bg-red-600 text-[#B8CFCE]"
                    >
                      Remove
                    </button>
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
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Form-level Error */}
        {errors.items && !errors.items.root && (
          <p className="text-red-500 mt-2">{errors.items.message}</p>
        )}

        <div className="mt-4 flex space-x-3">
          <button
            type="button"
            onClick={() =>
              append({ product_name: "", unit_cost: 0, quantity: 1 })
            }
            className="px-4 py-2 bg-blue-600 text-[#EAEFEF]  rounded hover:bg-blue-700"
          >
            + Add Product
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-[#EAEFEF] rounded hover:bg-green-700"
          >
            Submit Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseTable;
