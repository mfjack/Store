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
        src="./banner01-home.svg"
        alt="Até 55% off esse mês"
        width={100}
        height={100}
      />

      <div className="p-5">
        <Categories />
      </div>

      <div className="mt-5">
        <p className="mb-3 pl-5 font-bold uppercase">Ofertas</p>
        <ProductList products={deals} />
      </div>

      <Image
        className="h-auto w-full px-5"
        src="./banner02-home.svg"
        alt="Até 55% de desconto em mouses"
        width={100}
        height={100}
      />
    </>
  );
};

export default Home;
