import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
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

  return (
    <>
      <PromoBanner
        src="./banner01-home.svg"
        alt="Desconto de 55% só esse mês"
      />

      <div className="p-5">
        <Categories />
      </div>

      <div className="mt-5">
        <SectionTitle title="Ofertas" />
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="./banner02-home.svg"
        alt="Até 55% de desconto em mouses"
      />

      <div className="mt-5">
        <SectionTitle title="Teclados" />
        <ProductList products={keyboards} />
      </div>
    </>
  );
};

export default Home;
