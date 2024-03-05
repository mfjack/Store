import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CardItem from "./cardItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";

const Cart = () => {
   const { products, subtotal, total, totalDiscount } = useContext(CartContext);

   return (
      <div className="flex flex-col gap-8">
         <Badge className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase" variant='outline'>
            <ShoppingCartIcon size={16} />
            Carrinho
         </Badge>

         <div className="flex flex-col gap-5">
            {products.length > 0 ? (
               products.map((product) => (
                  <CardItem key={product.id} product={computeProductTotalPrice(product as any) as any} />
               ))
            ) : (
               <p className="text-center font-semibold">Carrinho vazio</p>
            )}
         </div>

         <div className="flex flex-col gap-3">
            <Separator />

            <div className="flex items-center justify-between text-xs">
               <p>Subtotal</p>
               <p>R$ {subtotal}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
               <p>Descontos</p>
               <p>- R$ {totalDiscount}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs font-bold">
               <p>Total</p>
               <p>R$ {total}</p>
            </div>
         </div>
      </div>
   );
};

export default Cart;
