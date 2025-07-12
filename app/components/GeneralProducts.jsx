"use client";
import Product from "./Product";
import React, { useContext } from "react";
import { setTraficLabel } from "../actions/nutrient";
import { DailyItemsList } from "../store/items-store";
import DisplayCart from "./DisplayCart";
const GeneralProducts = () => {
  const { generalProducts, tfLabel, toggleCart,setToggleCart } = useContext(DailyItemsList);
  return (
    <>
      <div
      onClick={(e) =>{setToggleCart(false); e.stopPropagation()}} 
        className={`generalProducts flex w-[80%] flex-wrap mx-auto ${
          toggleCart ? " black-overylay" : ""
        }`}
        
      >
        {generalProducts.map((item, index) => {
          return (
            <Product
              key={item.id || index}
              item_name={item.product_name}
              item_quantity="500ml"
              item_image={item.image_front_url}
              item_id={item.id}
              item_protein={item[setTraficLabel(tfLabel)]}
            />
          );
        })}
        <div className="cart absolute z-10 w-[80%] sm:w-[20%] right-0 flex">
          <DisplayCart />
        </div>
      </div>
    </>
  );
};

export default GeneralProducts;
