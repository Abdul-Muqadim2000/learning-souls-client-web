import React from "react";
import Image from "next/image";
import { Download, DownloadIcon, QrCode } from "lucide-react";
import GenericHeader from "./GenericHeader";
import Link from "next/link";

const ProductListItem = ({
  imageUrl,
  imageAltText = "Product Image",
  primaryButtonText = "Download",
  primaryButtonHref = "#",
  secondaryButtonText = "QR Code",
  secondaryButtonHref = "#",
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[280px] h-[380px] rounded-lg shadow-2xl overflow-hidden mb-6">
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={imageAltText}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href={primaryButtonHref}
          className="px-8 py-2 bg-[#bd2387] text-white rounded-full text-sm font-semibold hover:bg-[#a01d72] transition-all duration-300 flex items-center gap-2"
        >
          <DownloadIcon size={16} />
          {primaryButtonText}
        </Link>
        <Link
          href={secondaryButtonHref}
          className="px-8 py-2 bg-white border-2 border-(--color-secondary) text-(--color-secondary) rounded-full text-sm font-semibold hover:bg-(--color-secondary) hover:text-white transition-all duration-300 flex items-center gap-2"
        >
          <QrCode size={16} />
          {secondaryButtonText}
        </Link>
      </div>
    </div>
  );
};

const ProductList = ({ products = [] }) => {
  const defaultProducts = [
    {
      imageUrl: "/images/product3.jpg",
      imageAltText: "The Meaning of THE WISE QURAN",
    },
    {
      imageUrl: "/images/product2.jpg",
      imageAltText: "MUHAMMAD - A Prophet for Our Time",
    },
    {
      imageUrl: "/images/product1.jpg",
      imageAltText: "MUHAMMAD - His Life Based on the Earliest Sources",
    },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <div className="w-full bg-(--color-secondary) py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <GenericHeader
          title={"FREE BOOK DOWNLOADS"}
          subtitle={
            "Scan the QR codes below to access and download our collection of free educational and religious books. Enhance your knowledge and understanding with just a click."
          }
          textColor={"white"}
          height="md"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {displayProducts.map((product, index) => (
            <ProductListItem key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
