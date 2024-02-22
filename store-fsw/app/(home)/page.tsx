"use client";

import Image from "next/image";
import Categories from "./components/categories";

const Home = () => {
  return (
    <>
      <Image
        className="h-auto w-full p-5"
        src="/banner01-home.png"
        alt="Até 55% off esse mês"
        width={350}
        height={150}
      />

      <div className="mt-8">
        <Categories />
      </div>
    </>
  );
};

export default Home;
