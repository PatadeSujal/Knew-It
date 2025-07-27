"use client";
import React from 'react';
import BarcodeReader from '../components/BarcodeReader';
import { FaCircle } from "react-icons/fa";
const Page = () => {
  return (
    <>
      {/* Uncomment to enable barcode scanning */}
      <div className="flex items-center gap-2 m-5">
  <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">
    <FaCircle className="text-amber-700 text-[8px]" />
    Beta
  </span>
</div>


      <BarcodeReader />

      {/* <div className="coming-soon-container mx-auto flex justify-center items-center flex-col gap-4 my-10">
        <h1 className="text-4xl font-bold">Coming Soon</h1>
        
        <video
          id="banner-video"
          autoPlay
          muted
          playsInline
          loop
          className="w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[20%]"
        >
          <source src="images/barcode-anim.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div> */}
    </>
  );
};

export default Page;
