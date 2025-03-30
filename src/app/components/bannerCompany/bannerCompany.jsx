import Image from 'next/image';
import React from 'react';

export default async function BannerBlack() {
  const res = await fetch("http://localhost:1337/api/banner-company?populate=*", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.TOKEN_SECRET}`,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  if (!res.ok) {
    console.log("Error fetching data:", res.status, res.statusText);
    return <p className="text-center text-red-500">Failed to load images</p>;
  }

  const responseData = await res.json();
  const images = responseData?.data?.companyImg || [];
  return (
    <div className="bg-black w-full relative z-10">
      <div className="container m-auto flex flex-wrap justify-center md:justify-between items-center gap-4 sm:gap-10 p-4">
        {images.length > 0 ? (
          images.map((imgObj, i) => (
            <Image
              key={i}
              className="w-[150px] h-[35px] md:my-10 object-contain"
              src={"http://localhost:1337" + imgObj?.url}
              alt={`Company Logo ${i + 1}`}
              width={150} 
              height={35}
            />
          ))
        ) : (
          <p className="text-white">No images available</p>
        )}
      </div>
    </div>
  );
}
