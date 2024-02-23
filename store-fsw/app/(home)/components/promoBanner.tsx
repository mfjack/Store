import Image from "next/image";

interface PromoBannerProps {
  src: string;
  alt: string;
}

const PromoBanner = ({ src, alt }: PromoBannerProps) => {
  return (
    <>
      <Image
        className="h-auto w-full px-5"
        src={src}
        alt={alt}
        width={350}
        height={250}
      />
    </>
  );
};

export default PromoBanner;
