"use client";
import { DailyItemsList } from "../store/items-store";
import { useContext, useMemo,useState,useEffect } from "react";
import getNutrientColor from "../actions/nutrient";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const colorClassMap = {
  red: "text-red-500",
  amber: "text-yellow-500", // Tailwind uses 'yellow' instead of 'amber'
  green: "text-green-500",
};

const Product = ({
  item_name,
  item_quantity,
  item_image,
  item_id,
  item_protein,
  item_quantity_unit,
}) => {
  const {
    addItemDataToCart,
    cartItems,
    toggleCart,
    tfLabel,
    removeItemDataToCart,
  } = useContext(DailyItemsList);

  const inCartFromContext = cartItems.some((item) => item.id === item_id);

  const [localInCart, setLocalInCart] = useState(inCartFromContext);

  useEffect(() => {
    setLocalInCart(inCartFromContext);
  }, [inCartFromContext]);

  const nutrientColor = useMemo(() => {
    return getNutrientColor(tfLabel, item_protein);
  }, [tfLabel, item_protein]);

  const textColorClass = colorClassMap[nutrientColor] || "text-gray-500";

  const handleAdd = () => {
    setLocalInCart(true); // UI updates instantly
    addItemDataToCart(item_id); // background logic
  };

  const handleRemove = () => {
    setLocalInCart(false); // UI updates instantly
    removeItemDataToCart(item_id); // background logic
  };

  return (
    <div
      className={`product border-0 sm:w-[13%] md:w-[30%] xl:w-[13%]  w-[100%] sm:overflow-hidden  sm:shrink-0 h-[300px] p-5 flex flex-col justify-center gap-2 p-0.2 shadow-[0_2px_5px_-1px_rgba(50,50,93,0.25),0_1px_3px_-1px_rgba(0,0,0,0.3)]  m-2 ${
        toggleCart ? "pointer-events-none" : ""
      } `}
    >
      <div className="product-image w-[80%] m-auto">
        {item_image ? (
          <img
            src={item_image}
            alt={item_name}
            height="400"
            className={`rounded-2xl ${
              toggleCart ? "opacity-40" : ""
            } h-32 mx-auto`}
          />
        ) : (
          <ShimmerThumbnail />
        )}
      </div>

      <div className="name">
        <h2 className="text-xs font-semibold">{item_name}</h2>
      </div>
      <div className="quantity">
        <p className="text-xs">
          {item_quantity || "NA"}
          {item_quantity_unit}
        </p>
      </div>
      <div className="bottomDiv flex justify-between gap-5 items-center text-xs">
        <div className={`price font-bold ${textColorClass}`}>
          {" "}
          {item_protein !== undefined && item_protein !== null
            ? item_protein + "g"
            : "NA"}
        </div>

        {!localInCart ? (
          <div
            className="add-btn border-1 px-4 py-1 border-[#318616] flex justify-center rounded cursor-pointer"
            onClick={handleAdd}
          >
            <button className="btn text-[#318616] text-xs ">ADD</button>
          </div>
        ) : (
          <div
            className="add-btn border-1 px-4 py-1 border-[#318616] bg-[#318616] flex justify-center rounded cursor-pointer"
            onClick={handleRemove}
          >
            <button className="btn text-white text-xs  ">
              <FaTrashAlt />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
