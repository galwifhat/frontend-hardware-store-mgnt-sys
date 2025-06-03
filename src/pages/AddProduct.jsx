import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const validationSchema = z.object({
  product_name: z.string().nonempty({ message: "Product name is required" }),
  sku: z.string().nonempty({ message: "sku is required" }),
  brand_id: z.coerce.number().min(1, { message: "Select a Brand" }),
  category_id: z.coerce.number().min(1, { message: "Select category" }),
  image_url: z.string().nonempty({ message: "Product Image is required" }),
  current_stock: z.coerce
    .number()
    .min(1, { message: "Enter the current stock" }),
});

const AddProducts = () => {
  const [categories, setCategories] = useState([]); //fetch categories
  const [brands, setBrands] = useState([]); //fetch brands

  useEffect(() => {
    fetch("http://localhost:8000/categorydata") //get the endpoint of the fetched data
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/branddata") //get the endpoint of the fetched data
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      product_name: "",
      sku: "",
      brand_id: 0,
      category_id: 0,
      image_url: "",
      current_stock: "",
    },
  });

  const onSubmit = (values) => {
    //run POST request to our backend
    fetch("http://localhost:8000/newproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json()) //convert from json formart to plain object (what js can understand)
      .then((data) => {
        // reset the form
        reset();
        //UI feedback
        toast.success(data.message);
        // optionally we can redirect the user to the home page
        // navigate('/');
      });
  };


  return (
    <div className="px-4 sm:px-6 md:px-12 py-10 bg-[#333446]">
      <form
        className="p-6 rounded-xl shadow-lg flex flex-col gap-6 max-w-xl mx-auto bg-[#B8CFCE]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            className={`w-full p-2 rounded text-base text-gray-900 bg-[#EAEFEF] border ${
              errors?.product_name?.message
                ? "border-red-500"
                : "border-[#EAEFEF]"
            } `}
            type="text"
            placeholder="Product name"
            {...register("product_name")}
          />
          {errors?.product_name?.message ? (
            <p className="text-xs text-red-500 mt-1">
              {errors.product_name.message}
            </p>
          ) : null}
        </div>

        <div>
          <input
            className={`w-full p-2 rounded text-base text-gray-900 bg-[#EAEFEF] border ${
              errors?.sku?.message
                ? "border-red-500"
                : "border-[#EAEFEF]"
            } `}
            type="text"
            placeholder="SKU"
            {...register("sku")}
          />

          {errors?.sku?.message ? (
            <p className="text-xs text-red-500 mt-1">{errors.sku.message}</p>
          ) : null}
        </div>
        <div>
          <input
            className={`w-full p-2 rounded text-base text-gray-900 bg-[#EAEFEF] border ${
              errors?.image_url?.message
                ? "border-red-500"
                : "border-[#EAEFEF]"
            } `}
            type="text"
            placeholder="image_url"
            {...register("image_url")}
          />

          {errors?.image_url?.message ? (
            <p className="text-xs text-red-500 mt-1">
              {errors.image_url.message}
            </p>
          ) : null}
        </div>

        <div>
          <select
            className={`w-full p-2 rounded text-base text-gray-900 bg-[#EAEFEF] border ${
              errors?.brand_id?.message
                ? "border-red-500"
                : "border-[#EAEFEF]"
            } `}
            {...register("brand_id")}
          >
            <option value="">Select a Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brand_name}
              </option>
            ))}
          </select>
          {errors?.brand_id?.message ? (
            <p className="text-xs text-red-500 mt-1">
              {errors.brand_id.message}
            </p>
          ) : null}
        </div>

        <div>
          <select
            className={`w-full p-2 rounded text-base text-gray-900 bg-[#EAEFEF] border ${
              errors?.category_id?.message
                ? "border-red-500"
                : "border-[#EAEFEF]"
            } `}
            {...register("category_id")}
          >
            <option value={0}>Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>

          {errors?.category_id?.message ? (
            <p className="text-xs text-red-500 mt-1">
              {errors.category_id.message}
            </p>
          ) : null}
        </div>
        <div>
          <input
            className={`w-full p-2 rounded text-base text-gray-900 bg-[#EAEFEF] border ${
              errors?.current_stock?.message
                ? "border-red-500"
                : "border-[#EAEFEF]"
            } `}
            type="number"
            placeholder="Current Stock"
            {...register("current_stock")}
          />

          {errors?.current_stock?.message ? (
            <p className="text-xs text-red-500 mt-1">
              {errors.current_stock.message}
            </p>
          ) : null}
        </div>

        <button
          className="text-white font-semibold py-2 rounded transition-colors bg-[#7F8CAA]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
