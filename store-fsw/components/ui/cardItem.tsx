import { CartContext, CartProduct } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { useContext } from "react";

interface CardItemProps {
   product: CartProduct;
}

const CardItem = ({ product }: CardItemProps) => {
   const { decreaseProductQuantify } = useContext(CartContext)

   const handleDecreaseProductQuantifyClick = () => {
      decreaseProductQuantify(product.id)
   }

   return (
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="flex h-[78px] w-[78px] items-center justify-center rounded-lg bg-accent">
               <Image
                  className="h-auto w-auto max-w-[80%]"
                  src={product.imageUrls[0]}
                  alt={product.name}
                  sizes="100vw"
                  width={0}
                  height={0}
               />
            </div>

            <div className="flex flex-col">
               <p className="text-xs">{product.name}</p>
               <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                     R$ {product.totalPrice.toFixed(2)}
                  </p>
                  {product.discountPercentage > 0 && (
                     <p className="text-xs line-through opacity-75">
                        R$ {Number(product.basePrice).toFixed(2)}
                     </p>
                  )}
               </div>
               <div className="flex items-center gap-1">
                  <Button className="h-8 w-8" size="icon" variant="outline" onClick={handleDecreaseProductQuantifyClick}>
                     <ArrowLeftIcon size={12} />
                  </Button>

                  <span className="text-xs">{product.quantity}</span>

                  <Button className="h-8 w-8" size={"icon"} variant="outline">
                     <ArrowRightIcon size={12} />
                  </Button>
               </div>
            </div>
         </div>
         <Button size="icon" variant="outline">
            <TrashIcon size={16} />
         </Button>
      </div>
   );
};

export default CardItem;
