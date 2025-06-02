import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  brand_name: z.string().nonempty({ message: "Brand name is required" }),
});

const AddBrand = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      brand_name: "",
    },
  });

  const onSubmit = (values) => {
    fetch("http://localhost:8000/newbrand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(() => reset())
      .catch((error) => console.error("Submission error:", error));
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
              errors?.brand_name?.message
                ? "border-red-500"
                : "border-[#EAEFEF]"
            } `}
            type="text"
            placeholder="Brand name"
            {...register("brand_name")}
          />
          {errors?.brand_name?.message && (
            <p className="text-xs text-red-500 mt-1">
              {errors.brand_name.message}
            </p>
          )}
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

export default AddBrand;
