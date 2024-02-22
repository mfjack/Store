"use client";

import Image from "next/image";

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
    </>
  );
};

export default Home;
