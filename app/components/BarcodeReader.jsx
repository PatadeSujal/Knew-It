"use client";
import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeReader = () => {
  const [result, setResult] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        const constraints = {
          video: {
            facingMode: { exact: "environment" }, // Back camera
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", true); // iOS support
          videoRef.current.play();
        }

        // Start barcode scanning
        codeReader.decodeFromConstraints(
          { video: { facingMode: { exact: "environment" } } },
          videoRef.current,
          (res, err) => {
            if (res) {
              setResult(res.getText());
            }
          }
        );
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startScanner();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h2>Scan Barcode</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-[70%] mx-auto"
      />
      <p>Scanned Code: {result}</p>
    </div>
  );
};

export default BarcodeReader;
