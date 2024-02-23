import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import Categories from "./components/categories";
import ProductList from "./components/productList";

const Home = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <>
      <Image
        className="h-auto w-full p-5"
        src="/banner01-home.png"
        alt="Até 55% off esse mês"
        width={350}
        height={150}
      />

      <div className="p-5">
        <Categories />
      </div>
      <div className="mt-8">
        <ProductList products={deals} />
      </div>
    </>
  );
};

export default Home;
