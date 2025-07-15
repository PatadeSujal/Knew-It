"use client";
import React, { useContext, useEffect } from "react";
import { calculateNutritionScore, getChartOptions } from "../actions/nutrient";
import Chart from "react-apexcharts";
import { useState } from "react";
import { DailyItemsList, ItemListProvider } from "../store/items-store";
import { fetchData } from "../actions/nutrient";
import { positiveStatusStyles } from "../actions/nutrient";
import { FaCheckCircle } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { sumNutrient } from "../actions/nutrient";
  const Page = () => {
      const [nutrientValue, setNutrientValue] = useState({});
    const [aiResponse, setAiResponse] = useState({});
    const { cartItems } = useContext(DailyItemsList);
    // if (!cartItems) return <p>Loading...</p>;
    // const initialSeries = [12.1||cartItems?.protein, 23.5, 3.4, 5.4];

const sumNestedNutrient = (key) => {
  return cartItems.reduce((sum, item) => {
    const value = item.nutrients?.[key];
    return sum + (parseFloat(value) || 0);
  }, 0);
};



    const nutrientKeys = [
      "carbohydrates_100g",
      "cholesterol_100g",
      "fat_100g",
      "salt_100g",
      "sodium_100g",
      "proteins_100g",
      "sugars_100g",
      "saturated-fat_100g",
    ];
    const importantNutrients = {
      carbohydrates: "Carbohydrates",
      energy: "Energy",
      proteins: "Protein",
      fat: "Fat",
      "saturated fat": "Saturated Fat",
      "trans fat": "Trans Fat",
      sugars: "Sugars",
      salt: "Salt",
      sodium: "Sodium",
      saturatedFats: "Saturated Fats",
    };
  

     useEffect(() => {
    if (!cartItems || cartItems.length === 0) return;

    const totals = {};

    nutrientKeys.forEach((key) => {
      const total = sumNestedNutrient(key);
      totals[key] = total;
    });

    setNutrientValue(totals);
  }, [cartItems]);



 const series = [
      sumNutrient("protein", cartItems),
      sumNutrient("fats", cartItems),
      sumNutrient("sugars", cartItems),
    ];

    const score = calculateNutritionScore(
      sumNutrient("protein", cartItems),
      sumNutrient("fats", cartItems),
      sumNutrient("sugars", cartItems)
    );


    const fetchAiResponse = async () => {
      try {
        const response = await fetchData(nutrientValue);
        console.log("Ai content",response);
        const aiContent = response.choices?.[0]?.message?.content;
        const cleaned = aiContent
          ?.replace(/```(javascript|json)?|```/g, "")
          .trim();

        let aiObject;

        // Try JSON.parse directly
        try {
          aiObject = JSON.parse(cleaned);
        } catch (jsonError) {
          // Attempt to fix unquoted keys
          const fixed = cleaned.replace(
            /([{,]\s*)([a-zA-Z0-9_-]+)(\s*:)/g,
            '$1"$2"$3'
          );

          try {
            aiObject = JSON.parse(fixed);
          } catch (finalError) {
            // Fallback to Function-based parsing
            try {
              aiObject = Function('"use strict"; return (' + cleaned + ")")();
            } catch (evalError) {
              throw new Error(
                "Failed to parse AI response at all: " + evalError.message
              );
            }
          }
        }

        setAiResponse(aiObject);
      } catch (error) {
        console.error("Failed to fetch or parse AI response:", error);
      }
    };

      useEffect(() => {
    if (Object.keys(nutrientValue).length > 0) {
      fetchAiResponse();
    }
  }, [nutrientValue]);
  return (
    <>
      <div className="container w-[90%] sm:w-[70%] flex flex-col mx-auto gap-10 border-gray-200 ">
        <h1 className="text-[#121a0f] sm:text-4xl text-2xl font-bold tracking-tighter mx-auto mt-12">
          Cart Health Summary
        </h1>
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm  sm:w-[80%] mx-auto">
          <div>
            {/* Apex Donut Chart */}
            <Chart
              options={getChartOptions()}
              series={series}
              type="donut"
              height={320}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#121a0f]">
                  {score}
                </span>
                <span className="text-gray-500">/ 5</span>
              </div>
            </div>
            <div className="flex-1 sm:text-left">
              <h2 className="text-xl font-bold text-[#121a0f]">Health Meter</h2>
              <p className="text-gray-600 mt-2">
                Your cart has a good nutritional balance. Keep it up!
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#121a0f] mb-4">
            Nutrient Traffic Light
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 text-sm font-medium text-gray-600">
                    Nutrient
                  </th>
                  <th className="py-3  text-sm font-medium text-gray-600">
                    Amount (g)
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-600 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {} */}
                {Object.entries(nutrientValue).map(([key, value]) => {
                  const status =
                    aiResponse?.nutrient_status?.[key] || "unknown"; // fallback if missing
                  const statusStyles = positiveStatusStyles;
                  // Choose color styles based on status

                  const { text, bg, dot, label } = statusStyles[status];
                  return (
                    <tr key={key} className="border-b border-gray-200">
                      <td className="py-4 pr-4 text-[#121a0f] font-medium">
                        {key.replace("_", "/")}
                      </td>
                      <td className="py-4 pr-4 text-[#121a0f]">
                        {value.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`flex items-center justify-center gap-2 text-sm font-medium ${text} ${bg} rounded-full px-3 py-1`}
                        >
                          <span
                            className={`w-2.5 h-2.5 ${dot} rounded-full`}
                          ></span>
                          {label}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#121a0f] mb-3">
              👍 Good Nutrients
            </h3>
            <ul className="space-y-2">
              {aiResponse?.positive_comments &&
              aiResponse.positive_comments.length > 0 ? (
                aiResponse.positive_comments.map((comment, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="material-icons text-green-500 text-base">
                      <FaCheckCircle />
                    </span>
                    <span>{comment}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">
                  No positive nutrients found.
                </li>
              )}
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#121a0f] mb-3">
              ⚠️ Watch Out
            </h3>
            <ul className="space-y-2">
              {aiResponse?.negative_comments &&
              aiResponse.negative_comments.length > 0 ? (
                aiResponse.negative_comments.map((comment, index) => {
                  // Simple logic to determine severity
                  const isHigh = comment.toLowerCase().includes("high");
                  const iconColor = isHigh ? "text-red-500" : "text-amber-500";

                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className={`material-icons ${iconColor} text-base`}>
                        <IoWarningOutline />
                      </span>
                      <span>{comment}</span>
                    </li>
                  );
                })
              ) : (
                <li className="text-gray-500 italic">No negative comments.</li>
              )}
            </ul>
          </div>
        </section>
        <section className="bg-green-50 rounded-xl border border-green-200 p-6 flex items-center gap-4 shadow-sm">
          <span className="material-icons text-xl text-[var(--primary-color)]">
            <FaLightbulb />
          </span>
          <div>
            <h3 className="font-extrabold text-green-900 my-2">
              Insight &amp; Tip
            </h3>
            {aiResponse?.health_tips && aiResponse.health_tips.length > 0 ? (
              <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                {aiResponse.health_tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            ) : (
              <p className="text-green-800 text-sm italic">
                No health tips available.
              </p>
            )}
          </div>
        </section>
        <section className="mx-auto w-full">
          <h2 className="text-xl font-bold text-[#121a0f] mb-4">
            Individual Product Breakdown
          </h2>
          <div className="flex overflow-x-auto pb-4 mx-auto sm:-mx-4 px-4 space-x-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-wrap">
            {cartItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-52 bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center h-full  my-5"
                >
                  <div
                    className="w-full h-32 bg-center bg-no-repeat bg-contain rounded-lg "
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "20vh",
                    }}
                  ></div>
                  <h4 className="font-semibold text-[#121a0f] text-sm">
                    {item.name}
                  </h4>

                  {/* <div className="mt-2 text-xs font-medium text-green-800 bg-green-100 rounded-full px-2 py-0.5 inline-block">
                    Score: 5/5
                  </div> */}

                  {/* ✅ Nutrient Info */}
                  {Object.entries(item.nutrients || {})
                    .filter(([key]) =>
                      Object.keys(importantNutrients).includes(key)
                    )
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="text-[11px] text-left text-gray-600"
                      >
                        <strong>{importantNutrients[key]}:</strong> {value}
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
