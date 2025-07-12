"use client"

import {ItemListProvider} from "./store/items-store";

import DisplayCatageoryItems from "./components/DisplayCatageoryItems";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <>

        <DisplayCatageoryItems/>

    </>
  );
}
