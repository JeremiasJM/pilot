"use client";

import Input from "../../components/inputs/Input";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import TextArea from "@/app/components/inputs/TextArea";
import CustomCheckBox from "./CustomCheckBox";
import { categories } from "@/utils/Categories";
import CategoryInput from "@/app/components/inputs/CategoyInput";
import SelectImage from "@/app/components/inputs/SelectImage";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  image: File | null;
};

export type UploadedImageType = {
  image: string;
};
const AddProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setisProductCreated] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setisProductCreated(false);
    }
  }, [isProductCreated]);

  const category = watch("category");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    console.log("Product Data", data);

    setIsLoading(true);
    
    let uploadedImages: UploadedImageType[] = [];
    if (!data.category) {
      setIsLoading(false);
      return toast.error("Please select a category");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Please select an image");
    }
    const handleImageUploads = async () => {
      toast("Creating product, please wait ..");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName} `);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading imge", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error downloading image", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error uploading images", error);
        return toast.error("Error uploading images");
      }
    };
    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };
    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created successfully");
        setisProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        console.log("Error creating product", error);
        toast.error("Error creating product");
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log("Product Data", productData);
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const handleFileChange = (files: File[]) => {
    setImages(files.map((file) => ({ image: file })));
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
        <div>
          <SelectImage
            item={watch("image")}
            handleFileChange={handleFileChange}
          />
        </div>
      </div>
      <Button
        label={isLoading ? "Loading ..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};
export default AddProducts;
