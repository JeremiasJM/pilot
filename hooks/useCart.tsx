import {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartProductType } from "@/app/product/[productId]/PorductDetail";
import { toast } from "react-hot-toast";
import { get } from "http";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
};
export const CartContext = createContext<CartContextType | null>(null);
interface Props {
  [propName: string]: any;
}
export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("PilotCartItems");
    if (cartItems) {
      setCartProducts(JSON.parse(cartItems));
    }
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {       
        const { total, qty } = cartProducts?.reduce((acc, item) => {
          const itemTotal = item.quatity * item.price;

          acc.total += itemTotal;
          acc.qty += item.quatity;

          return acc;
        },{
          total: 0,
          qty: 0,
        });
        setCartTotalQty(qty)
        setCartTotalAmount(total)
      }
    };
    getTotals();
  },[cartProducts] );

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      localStorage.setItem("PilotCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });

    setCartTotalQty((prevTotalQty) => prevTotalQty + 1);
    toast.success("Product added to cart");
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filterredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filterredProducts);
        toast.success("Product removed from cart");
        localStorage.setItem(
          "PilotCartItems",
          JSON.stringify(filterredProducts)
        );
      }
    },
    [cartProducts]
  );
  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quatity === 99) {
        return toast.error("Max quantity reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quatity = ++updatedCart[existingIndex]
            .quatity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("PilotCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quatity === 1) {
        return toast.error("Min Quatity 1 product");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quatity = --updatedCart[existingIndex]
            .quatity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("PilotCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleClearCart = useCallback(() => {
    setCartProducts([]);
    setCartTotalQty(0);
    localStorage.removeItem("PilotCartItems");
    toast.success("Cart cleared");
  }, [cartProducts]);

  const value = {
    cartTotalQty,
    cartProducts,
    handleClearCart,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    cartTotalAmount,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
