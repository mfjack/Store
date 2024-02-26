import { prismaClient } from "@/lib/prisma";
import Categories from "./components/categories";
import ProductList from "./components/productList";
import SectionTitle from "./components/sectionTitle";
import PromoBanner from "./components/promoBanner";

const Home = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <section className="flex flex-col gap-8 py-8">
      <PromoBanner
        src="./banner01-home.svg"
        alt="Desconto de 55% só esse mês"
      />

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle title="Ofertas" />
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="./banner02-home.svg"
        alt="Até 55% de desconto em mouses"
      />

      <div>
        <SectionTitle title="Teclados" />
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src="./banner03-home.svg"
        alt="Até 55% de desconto em mouses"
      />

      <div>
        <SectionTitle title="Mouses" />
        <ProductList products={mouses} />
      </div>
    </section>
  );
};

export default Home;
