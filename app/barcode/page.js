"use client";
import React from 'react';
import BarcodeReader from '../components/BarcodeReader';

const Page = () => {
  return (
    <>
      {/* Uncomment to enable barcode scanning */}
      {/* <BarcodeReader /> */}

      <div className="coming-soon-container mx-auto flex justify-center items-center flex-col gap-4 my-10">
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
      </div>
    </>
  );
};

export default Page;
