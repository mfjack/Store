import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/productImages";
import ProductInfo from "./components/productInfo";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/productList";
import SectionTitle from "@/app/(home)/components/sectionTitle";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          product: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductTotalPrice(product)} />
      <div>
        <SectionTitle title="Produtos recomendados" />
        <ProductList products={product.category.product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
