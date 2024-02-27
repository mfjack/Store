"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  imageUrls: string[];
  name: string;
}

const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
          src={imageUrls[0]}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>

      <div className="mt-5 grid grid-cols-4 gap-4 px-5">
        {imageUrls.map((imageUrl) => (
          <button
            className={`h-[80px] w-[80px] rounded-lg ${
              imageUrl === currentImage
                ? "border-2 border-primary"
                : "border-2 border-transparent"
            }`}
            onClick={() => handleImageClick(imageUrl)}
            key={imageUrl}
          >
            <Image
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
              src={currentImage}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
