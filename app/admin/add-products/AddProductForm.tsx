"use client";

import Input from "../../components/inputs/Input";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TextArea from "@/app/components/inputs/TextArea";
import CustomCheckBox from "./CustomCheckBox";
import { categories } from "@/utils/Categories";
import CategoryInput from "@/app/components/inputs/CategoyInput";

export type ImageType = {
  image: File | null;
};

export type UploadedImageType = {
  image: string;
};
const AddProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: [],
      category: "",
      inStock: false,
    },
  });

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  return (
    <>
      <h1 className="text-bold text-center pb-4"> Add a Product</h1>
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This PRODUCT IS IN STOCK"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto ">
          {categories.map((item) => {
            if (!item || item.label === "All") {
              return null;
            }

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}{" "}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold"></div>
        </div>
        <div></div>
      </div>
    </>
  );
};
export default AddProducts;
