import Image from "next/image";

let data = [
  {
    id:1,
    text1:"FIND CLOTHES THAT MATCHES YOUR STYLE",
    text2:"Browse through our diverse range of meticulously crafted garments,designed to bring out your individuality and cater to your sense of style.",
    img1:"/assets/imgH.png",
    imgIcon:"/assets/Vector.png",
  }
]



export default function HomePage() {
  return (
    <div className="bg-[#f2f0f1] sm:relative ">
      {data.map((item) => (
        <div
          key={item.id}
          className="container w-full pt-5 sm:py-20  overflow-hidden  m-auto grid grid-cols-1  md:grid-cols-[2fr_1.5fr] lg:grid-cols-[1.5fr_2fr]"
        >
          <div className=" p-[11px] sm:p-0 m-auto relative z-10 ">
            <h1 className=" text-[40px] leading-none sm:text-5xl w-full mb-4  text-start font-black">
              {item.text1}
            </h1>
            <h3 className="text-gray-400 text-sm">{item.text2}</h3>
            <a
              href="#"
              className="bg-black w-full  sm:w-[150px] rounded-3xl text-white p-[8px] mt-3  flex  justify-center"
            >
              Shop Now
            </a>

            <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-2">
              <div className="grid grid-cols-1 pr-5 sm:pr-0  border-r-2">
                <span className="text-[30px] font-bold font-sans">200+</span>
                <span className=" text-[12px] text-gray-600">
                  International Brands
                </span>
              </div>
              <div className="grid grid-cols-1 pl-5">
                <span className="text-[30px] font-bold">2,000+</span>
                <span className=" text-[12px] text-gray-600">
                  High-Quality Products
                </span>
              </div>
              <div className="grid grid-cols-1 sm:pl-5 sm:border-l-2">
                <span className="text-[30px] font-bold"> 30,000+</span>
                <span className=" text-[12px] text-gray-600">
                  Happy Customers
                </span>
              </div>
            </div>
          </div>


          <div className="h-[350px] max-[768px]:relative">

            <div className=" absolute max-[768px]:left-[-7%] max-[768px]:top-[20%] left-[20%] top-[5%]  flex justify-center w-full h-full">
              
              <span className="w-[100px]">
                <Image
                className=" absolute "
                  src={item.imgIcon}
                  alt="icon-photo"
                  width={100}
                  height={100}
                />
              </span>


              <Image
                className="object-contain "
                src={item.img1}
                alt="big-photo"
                width={500}
                height={500}
              />

              <span className=" w-[100px]">
                <Image
                className="absolute "
                  src={item.imgIcon}
                  alt="icon-photo"
                  width={50}
                  height={50}
                />
              </span>


            </div>


          </div>




        </div>
      ))}
    </div>
  );
}