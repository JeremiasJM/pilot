"ue client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ProductDetailProps {
  product: any;
}
export type CartProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const { cartTotalQty } = useCart();
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    stock: product.stock,
  });
  const router = useRouter();
  console.log(cartProducts);
  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);
  const Horizontal = () => {
    return <hr className="w-[30% my-2]" />;
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <img
          className="w-full h-[400px] object-contain"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-medium text-slate-700">{product.title}</h2>
        <div className="text-lg text-gray-600">${product.price}</div>
        <Horizontal />

        <div className="text-justyfy">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span>
          {product.category}
        </div>
        <div className={product.stock ? "text-teal-400" : "text-rose-400"}>
          {product.stock ? "In Stock" : "Out of Stock"}{" "}
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
