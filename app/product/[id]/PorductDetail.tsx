"ue client";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/app/components/Button";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import SetQuantity from "@/app/components/products/SetQuantity";

interface ProductDetailProps {
  product: any;
}
export type CartProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  images: any;
  stock: number;
  quatity: number;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const productoId = product[0];
  const { cartTotalQty } = useCart();
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: productoId.id,
    name: productoId.name,
    price: productoId.price,
    description: productoId.description,
    category: productoId.category,
    images: productoId.images,
    stock: productoId.stock,
    quatity: 1,
  });
  const router = useRouter();
  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === productoId.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);
  const Horizontal = () => {
    return <hr className="w-[30% my-2]" />;
  };
  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quatity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quatity: prev.quatity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quatity === 1) {
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quatity: prev.quatity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
      <div>
        <img
          className="w-full h-[400px] object-contain"
          src={productoId.images[0].image}
          alt={productoId.name}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-medium text-slate-700">
          {productoId.name}
        </h2>
        <div className="text-lg text-gray-600">${productoId.price}</div>
        <Horizontal />

        <div className="text-justyfy">{productoId.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span>
          {productoId.category}
        </div>
        <div className={productoId.stock ? "text-teal-400" : "text-rose-400"}>
          {productoId.stock ? "In Stock" : "Out of Stock"}{" "}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
