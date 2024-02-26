import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/productItem";
import { CATEGORY_ICON } from "@/constants/categoryIcon";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

const CategoryProducts = async ({ params }: any) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
  });
  const products = await prismaClient.product.findMany({
    where: {
      category: {
        slug: params.slug,
      },
    },
  });

  if (!category) {
    return null;
  }

  return (
    <section className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>

      <div className="grid grid-cols-2 flex-wrap gap-8">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryProducts;
