import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CardItem from "./cardItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js"

const Cart = () => {
   const { products, subtotal, total, totalDiscount } = useContext(CartContext);

   const handleFinishPurchase = async () => {
      const checkout = await createCheckout(products);

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIKE_PUBLIC_KEY)

      stripe?.redirectToCheckout({ sessionId: checkout.id })
   }

   return (
      <div className="flex flex-col gap-8 h-full">
         <Badge className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase" variant='outline'>
            <ShoppingCartIcon size={16} />
            Carrinho
         </Badge>

         <div className="flex flex-col gap-5 h-full max-h-full overflow-hidden">
            <ScrollArea className="h-full">
               <div className="flex flex-col gap-7 h-full">
                  {products.length > 0 ? (
                     products.map((product) => (
                        <CardItem
                           key={product.id}
                           product={computeProductTotalPrice(product as any) as any}
                        />
                     ))
                  ) : (
                     <p className="text-center font-semibold">Carrinho vazio</p>
                  )}
               </div>
            </ScrollArea>
         </div>

         <div className="flex flex-col gap-3">
            <Separator />

            <div className="flex items-center justify-between text-xs">
               <p>Subtotal</p>
               <p>R$ {subtotal.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
               <p>Descontos</p>
               <p>- R$ {totalDiscount.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs font-bold">
               <p>Total</p>
               <p>R$ {total.toFixed(2)}</p>
            </div>

            <Button className="font-bold uppercase mt-7" onClick={handleFinishPurchase}>Finalizar compra</Button>
         </div>
      </div>
   );
};

export default Cart;
