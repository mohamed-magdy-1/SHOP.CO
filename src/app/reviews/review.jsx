"use client";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { FaStar } from "react-icons/fa6";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Review() {
  let data = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
  ];






  var settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };




  return (
    <div className="mt-28 overflow-x-hidden">
      <div className="container m-auto mb-12">
        <h1 className="text-3xl font-black">OUR HAPPY CUSTOMERS</h1>
      </div>
      <div className="slider-container ">
        <Slider {...settings}>
          {data.map((rev) => (
            <div className="border rounded-2xl p-5 " key={rev.id}>
<div className='flex '>
<div className="flex w-fit relative items-start">
  <span className='star flex text-gray-400'>
<FaStar />
<FaStar />
<FaStar />
<FaStar />
<FaStar />
  </span>

<div style={{width:`${(4.3 / 5 ) * 100}%`}} className='overflow-hidden absolute top-0 left-0 '>
  <span className='[display:ruby-text]  text-[#ffc700]'>
<FaStar />
<FaStar />
<FaStar />
<FaStar />
<FaStar />
</span>
</div>
</div>
<p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.5</p>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">/</p>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
</div>
              <h3 className="text-xl font-bold flex gap-2 mb-3 items-center">
                Mark.joo <IoIosCheckmarkCircle className="text-green-600" />
              </h3>
              <p className="text-gray-500 text-sm">
                "As someone who's always on the lookout for unique fashion
                pieces, I'm thrilled to have stumbled upon Shop.co. The
                selection of clothes is not only diverse but also on-point with
                the latest trends.”
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Review;
