"use client";

import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discountBadge";
import { ProductWithTotalPrice } from "@/helpers/product";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "description" | "discountPercentage" | "totalPrice" | "name"
  >;
}

const ProductInfo = ({
  product: { basePrice, description, discountPercentage, totalPrice, name },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="mt-8 flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>
      <div className="flex items-center gap-1">
        <h1 className="gap-2 text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>
        {discountPercentage > 0 && (
          <DiscountBadge className="absolute left-3 top-3">
            {discountPercentage}
          </DiscountBadge>
        )}
      </div>

      {discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={decreaseQuantity}>
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button size={"icon"} variant="outline" onClick={increaseQuantity}>
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-semibold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>

      <Button className="mt-8 font-bold uppercase">
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-3">
          <TruckIcon />
          <div className="flex flex-col gap-1">
            <p className="text-xs">
              Entrega via <span className="font-bold">FSPacket®</span>
            </p>
            <p className="text-xs text-violet-500">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>
        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
