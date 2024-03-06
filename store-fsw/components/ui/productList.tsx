import ProductItem from "@/components/ui/productItem";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={{
            ...product,
            totalPrice: computeProductTotalPrice(product),
          }}
          className="w-[156px] lg:w-[200px] lg:min-w-[200px]"
        />
      ))}
    </div>
  );
};

export default ProductList;
