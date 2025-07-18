"use client";

import React, { useContext } from "react";
// import GeneralProducts from "../../components/GeneralProducts";
import GeneralProducts from "./GeneralProducts";
import DisplayCart from "./DisplayCart";
import { DailyItemsList } from "../store/items-store";

const SearchClientPage = () => {
  const { toggleCart } = useContext(DailyItemsList);

  return (
    <div
      className={`w-full border-2 ${
        toggleCart ? " duration-150 black-overylay w-[90%] sm:w-[20%]" : ""
      }`}
    >
      <GeneralProducts />
      <div
        className={`cart absolute z-10 w-[20%] right-0 flex ${
          toggleCart ? "sm:w-[20%] w-[90%]" : "hidden"
        }`}
      >
        <DisplayCart />
      </div>
    </div>
  );
};

export default SearchClientPage;
