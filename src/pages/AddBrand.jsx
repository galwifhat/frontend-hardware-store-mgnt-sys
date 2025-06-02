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
    <div>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={
              errors?.brand_name?.message ? "border border-red-500" : "border"
            }
            type="text"
            placeholder="Brand name"
            {...register("brand_name")}
          />
          {errors?.brand_name?.message && (
            <span className="text-xs text-red-500">
              {errors.brand_name.message}
            </span>
          )}
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

export default AddBrand;
