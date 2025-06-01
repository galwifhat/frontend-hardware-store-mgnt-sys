import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const validationSchema = z.object({
  product_name: z.string().nonempty({ message: "Product name is required" }),
  sku: z.string().nonempty({ message: "sku is required" }),
  brand_id: z.coerce.number().min(1, { message: "Select a Brand" }),
  category_id: z.coerce.number().min(1, { message: "Select category" }),
  image_url: z.string().nonempty({ message: "Product Image is required" }),
  current_stock: z.coerce
    .number()
    .min(0, { message: "Enter the current stock" }),
});

const AddProducts = () => {
  const [categories, setCategories] = useState([]); //fetch categories
  const [brands, setBrands] = useState([]); //fetch categories

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
      .then((res) => res.json())
      .then((data) => {
        // reset the form
        reset();
      });
  };

  return (
    <div className="p-3">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={
              errors?.product_name?.message ? "border border-red-500" : "border"
            }
            type="text"
            placeholder="Product name"
            {...register("product_name")}
          />

          {/* conditional rendering */}
          {errors?.product_name?.message ? (
            <p className="text-xs text-red-500">
              {errors.product_name.message}
            </p>
          ) : null}
        </div>

        <div>
          <input
            className={
              errors?.sku?.message
                ? "border border-red-500"
                : "border bg-blue-300 rounded"
            }
            type="text"
            placeholder="SKU"
            {...register("sku")}
          />

          {errors?.sku?.message ? (
            <p className="text-xs text-red-500">{errors.sku.message}</p>
          ) : null}
        </div>
        <div>
          <input
            className={
              errors?.image_url?.message ? "border border-red-500" : "border"
            }
            type="text"
            placeholder="image_url"
            {...register("image_url")}
          />

          {errors?.image_url?.message ? (
            <p className="text-xs text-red-500">{errors.image_url.message}</p>
          ) : null}
        </div>

        <div>
          <select
            className={
              errors?.brand_id?.message ? "border border-red-500" : "border"
            }
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
            <p className="text-xs text-red-500">{errors.brand_id.message}</p>
          ) : null}
        </div>

        <div>
          <select
            className={
              errors?.category_id?.message ? "border border-red-500" : "border"
            }
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
            <p className="text-xs text-red-500">{errors.category_id.message}</p>
          ) : null}
        </div>
        <div>
          <input
            className={
              errors?.current_stock?.message
                ? "border border-red-500"
                : "border bg-blue-300 rounded"
            }
            type="number"
            placeholder="Current Stock"
            {...register("current_stock")}
          />

          {errors?.current_stock?.message ? (
            <p className="text-xs text-red-500">
              {errors.current_stock.message}
            </p>
          ) : null}
        </div>

        <button
          className="bg-[#48cae4] rounded-lg hover:cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
