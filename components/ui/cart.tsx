import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import CartItem from "./cardItem";
import { createOrder } from "@/actions/order";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data } = useSession();

  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      // TODO: redirecionar para o login
      return;
    }

    const order = await createOrder(products, (data?.user as any).id);

    const checkout = await createCheckout(products, order.id);
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={{
                    ...product,
                    totalPrice: computeProductTotalPrice(product),
                  }}
                />
              ))
            ) : (
              <p className="text-center font-semibold">
                Carrinho vazio. Vamos fazer compras?
              </p>
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

        <Button
          className="mt-7 font-bold uppercase"
          onClick={handleFinishPurchaseClick}
        >
          Finalizar compra
        </Button>
      </div>
    </div>
  );
};

export default Cart;
