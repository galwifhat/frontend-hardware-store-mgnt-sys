import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  category_name: z.string().nonempty({ message: "Category name is required" }),
});

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      category_name: "",
    },
  });

  const onSubmit = (values) => {
    fetch("http://localhost:8000/newcategory", {
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
              errors?.category_name?.message
                ? "border border-red-500"
                : "border"
            }
            type="text"
            placeholder="Category name"
            {...register("category_name")}
          />
          {errors?.category_name?.message && (
            <span className="text-xs text-red-500">
              {errors.category_name.message}
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

export default AddCategory;
