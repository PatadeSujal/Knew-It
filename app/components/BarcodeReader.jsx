"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";
import { DecodeHintType } from "@zxing/library";
import { DailyItemsList } from "../store/items-store";
import { FaTachometerAlt } from "react-icons/fa";
import CartItem from "./CartItem";
import Link from "next/link";
import FeedbackFooter from "./FeedbackFooter";
import Popup from "./Popup";

const BarcodeReader = () => {
  const [result, setResult] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [message,setMessage] = useState("Product Data Not Available");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scannedOnceRef = useRef(false);
  const scannedCodesRef = useRef(new Set()); // ✅ track scanned barcodes
  const { addItemDataToCart, cartItems } = useContext(DailyItemsList);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const constraints = {
    video: {
      facingMode: isMobile ? { exact: "environment" } : "user",
    },
  };

  const startScanner = async () => {
    scannedOnceRef.current = false;

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
    ]);

    const reader = new BrowserMultiFormatReader(hints);

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        videoRef.current.play();
      }

      reader.decodeFromConstraints(
        { video: constraints.video },
        videoRef.current,
        (res, err) => {
          if (res && !scannedOnceRef.current) {
            scannedOnceRef.current = true;

            const scannedCode = res.getText();
            setResult(scannedCode);

            
            if (!scannedCodesRef.current.has(scannedCode)) {
              scannedCodesRef.current.add(scannedCode);
              addItemDataToCart(scannedCode);

            } else {
              console.log("❌ Already scanned:", scannedCode);
            }
            
            stopScanner();

            setTimeout(() => {
              startScanner();
            }, 2000);
          }

         
        }
      );

    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    startScanner();
    console.log("CartItems", cartItems[cartItems.length - 1]?.protein);
    console.log("CartItems", cartItems);
    if (Number.isNaN(cartItems[cartItems.length - 1]?.protein) || cartItems[cartItems.length - 1]?.name === undefined) {

      setPopupOpen(true);
      if(cartItems[cartItems.length - 1]?.name !== undefined){
        setMessage(`Product (${cartItems[cartItems.length - 1]?.name}) Data is Not Available`);
      }
      cartItems.pop();
      console.log("❌ Product not found in the database");
    }
    return () => stopScanner();
  }, [cartItems]);

  return (
    <div>
      <h2 className="text-center text-xl font-semibold my-5">
        Scan Barcode on Food Packaging
      </h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-[95%] h-[20vh] sm:w-[60%] sm:h-[20vh] mx-auto border rounded-2xl shadow-md object-cover"
      />

      <p className="text-center mt-4 font-medium text-gray-700">
        Scanned Code: {result}
      </p>

      <div className="cart-items-container mt-5 w-[90%] sm:w-[20%] flex flex-col justify-center items-center gap-5 mx-auto">
        {cartItems
          .slice()
          .reverse()
          .map((item, index) => (
            <CartItem
              key={index}
              item_name={item.name}
              item_image={item.image}
              item_price={item.price}
              item_id={item.id}
              item_quantity={item.product_quantity}
              item_quantity_unit={item.product_quantity_unit}
            />
          ))}

        {isPopupOpen && (
          <Popup
            message={message}
            onClose={() => setPopupOpen(!isPopupOpen)}
          />
        )}

        <div className="health-meter">
          <button
            type="button "
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-52 flex gap-2 justify-center items-center cursor-pointer "
          >
            <Link
              href="/health-meter"
              className="flex justify-center items-center flex-col gap-2 font-bold"
            >
              <FaTachometerAlt />
              Health Meter
            </Link>
          </button>
        </div>
      </div>
      <FeedbackFooter />
    </div>
  );
};

export default BarcodeReader;
