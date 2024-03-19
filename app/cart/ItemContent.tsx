import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[id]/PorductDetail";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import SetQuantity from "../components/products/SetQuantity";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();
  return (
    <div
      className="
    grid grid-cols-4 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center "
    >
      <div className="cols-span-2 justify-self-start ml-3 flex gap-2 md:gap-2">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square ">
            <Image
              src={item.images[0].image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div className="w-[70px]">
            <button
              className=" text-slate-500 underline"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)} </div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyDecrease={() => {
            handleCartQtyDecrease(item);
          }}
          handleQtyIncrease={() => {
            handleCartQtyIncrease(item);
          }}
        />
      </div>
      <div className="justify-self-center font-semibold">
        {" "}
        {formatPrice(item.price * item.quatity)}{" "}
      </div>
    </div>
  );
};
export default ItemContent;
