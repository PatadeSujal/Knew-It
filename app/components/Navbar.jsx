"use client";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { DailyItemsList } from "../store/items-store";
import { useContext, useEffect, useState } from "react";
import DisplayCart from "./DisplayCart";
import { setTraficLabel, sumNutrient } from "../actions/nutrient";
import Link from "next/link";
const Navbar = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const {
    cartItems,
    setToggleCart,
    toggleCart,
    tfLabel,
    setTfLabel,
    setSearchItems,
    searchItems,
    setGeneralProducts,
  } = useContext(DailyItemsList);

  let totalNutri = 0;
  useEffect(() => {
     const total = cartItems.reduce((sum, item) => {
    const value = item?.[tfLabel || "fats"];
    return sum + (value !== undefined ? parseFloat(value) || 0 : 0);
  }, 0);

    console.log(tfLabel);
    console.log(typeof total);
    setCartTotal(total);
    console.log(totalNutri);
  }, [cartItems, tfLabel]);

  useEffect(() => {
    fetch(
      `https://in.openfoodfacts.org/cgi/search.pl?search_terms=${searchItems}&search_simple=1&json=1&page_size=50&fields=product_name,id,image_front_url,proteins_100g,saturated-fat_100g,trans-fat_100g,sugars_100g&sort_by=popularity`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Data ", data.products);
        setGeneralProducts(data.products);
      });
  }, [searchItems]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setTfLabel(selectedValue);
  };
  return (
    <>
      <nav className="w-full flex-col py-5  sm:h-20 flex items-center justify-center sticky top-0 bg-blue-100 z-10 ">
        <div className="flex justify-center gap-1 w-[100%] mx-auto h-full items-center">
          <div className="w-[90px] sm:w-[10%]">
            <Link href="/">
              <img src="images/logo.png" className="w-full " alt="Logo" />
            </Link>
          </div>

          <div className=" rounded m-3 flex justify-center items-center"  draggable="false">
            <Link href="/search">
              <input
                type="text"
                placeholder='Type any food product here...'
              
                className=" w-2xl hidden xl:block border-none rounded-lg  p-3 m-2 border-0 bg-[#f8f8f8]"
                onChange={(e) => {
                  setSearchItems(e.target.value);
                  console.log(e.target.value);
                }}
              />
             
            </Link>
          </div>
          <div className="mx-3">
            <h3 className="font-bold text-center text-sm">
              {(cartTotal).toFixed(2) + "g " + tfLabel}
            </h3>
          </div>
          <div className="flex items-center mx-6">
            <select name="mySelect" id="mySelect" onChange={handleChange}>
              {/* <option value="">Select Nutrient</option> */}
              <option value="protein">Protein /100g</option>
              <option value="fats">Saturated Fats</option>
              <option value="sugars">Sugar</option>
            </select>
          </div>
          <div className=" items-center mx-12  hidden sm:inline">
            <button
              type="button"
              className={` ${
                cartItems.length === 0
                  ? "bg-gray-400 cursor-no-drop "
                  : "bg-green-700"
              } md:flex text-sm hidden p-2 rounded-lg  justify-center items-center gap-3 text-white font-bold `}
              onClick={() => {
                setToggleCart(!toggleCart);
              }}
            >
              <FaShoppingCart />
              <div className="prices flex flex-col">
                <span className="text-[12px]">
                  {cartItems.length > 0
                    ? cartItems.length + " Items "
                    : "  My Cart"}
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="search  w-full flex gap-3 items-center justify-evenly mx-5  sm:hidden">
          <div>
            <Link href="/search " className="">
              <input
                type="text"
                placeholder='Search "rice"'
                className=" sm:hidden border-none m-2 rounded-lg  p-2  border-0 bg-[#f8f8f8]"
                onChange={(e) => {
                  setSearchItems(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </Link>
          </div>
          <div className="flex w-4xl justify-center items-center text-sm sm:hidden">
            <button
              type="button"
              className={`${
                cartItems.length === 0
                  ? "bg-gray-400 cursor-no-drop"
                  : "bg-green-700"
              }  sm:hidden  text-sm px-2 rounded-lg p-3 justify-center items-center gap-3 text-white font-extrabold`}
              onClick={() => {
                setToggleCart(!toggleCart);
              }}
            >
              <span className="prices flex flex-col  ">
                <span className="text-[12px] font-bold">
                  {cartItems.length > 0
                    ? ` ${cartItems.length} Items`
                    : "My Cart"}
                </span>
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
