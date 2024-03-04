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
        <div className="w-[170px] max-w-[170px]" key={product.id}>
          <ProductItem
            product={computeProductTotalPrice(product)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
