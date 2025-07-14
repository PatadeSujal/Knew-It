import React, { useContext, useEffect } from "react";
import CartItem from "./CartItem";
import { DailyItemsList } from "../store/items-store";
import { FaTachometerAlt } from "react-icons/fa";
import Link from "next/link";

const DisplayCart = () => {
  const { cartItems } = useContext(DailyItemsList);
  

  const { toggleCart, } = useContext(DailyItemsList);
  return (
    <div className="container flex ">
      <div
        className={`${
          toggleCart ? "w-full  p-5 flex flex-col " : " hidden"
        } cart bg-[#f5f7fd] h-[90vh] mx-auto overflow-auto  transition  duration-700 justify-between items-center z-20`}
      >
        <div className="items">
          {cartItems.map((item, index) => {
            return (

              <CartItem
                key={index}
                item_name={item.name}
                item_quantity="500ml"
                item_image={item.image}
                item_price={item.price}
                item_id={item.id}
                />
           
            );
          })}
        </div>
        <div className="health-meter mb-40 ">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 justify-center items-center cursor-pointer"
          >
            <Link href="/health-meter">
              <FaTachometerAlt />
              Health Meter
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayCart;
