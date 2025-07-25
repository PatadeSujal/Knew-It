// import React, { useContext } from 'react'
import { DailyItemsList } from '../store/items-store';
import DisplayCart from "./DisplayCart";
import DisplayProducts from "./DisplayProducts";
import { useContext } from 'react';
import FeedbackFooter from './FeedbackFooter';
import { BiBarcodeReader } from "react-icons/bi";
import Link from 'next/link';
const DisplayCatageoryItems = () => {
  const {setToggleCart,toggleCart} = useContext(DailyItemsList);
  // const hideCartMenu = () =>{
  //   setToggleCart(false);
  // }
  return (
    <>
      <div className={`w-full   ${toggleCart ? "duration-700 black-overylay" : "duration-700"}`} >
        <div className="cart absolute sm:w-[70%] z-10 w-[80%] xl:w-[20%] md:w-[40%] right-0 flex">

        <DisplayCart />
        </div>
        <div 
        onClick={(e) =>{setToggleCart(false); e.stopPropagation()}} className=''
        >
          <DisplayProducts title="Milk" />
          <DisplayProducts title="paneer" />
          <DisplayProducts title="sweet snacks" />
          <DisplayProducts title="salty snacks" />
          <DisplayProducts title="Drinks" />
          <DisplayProducts title="Fruit Juices" />
          <DisplayProducts title="Peanut butter" />
        </div>

        <div className="scanner bg-red-400  w-[12%] sm:w-[6%] fixed bottom-20 right-8 flex justify-center p-3 items-center rounded-full z-20 ">
          <Link href="/barcode"><button className='mx-auto text-white font-bold'><BiBarcodeReader /></button></Link>
        </div>
        <FeedbackFooter/>
      </div>
    </>
  );
};

export default DisplayCatageoryItems;
