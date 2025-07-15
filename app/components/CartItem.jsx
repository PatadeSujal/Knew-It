import React, { useContext } from "react";
import { DailyItemsList } from "../store/items-store";
import { FiMinusCircle } from "react-icons/fi";
const CartItem = ({ item_name, item_quantity, item_image, item_price,item_id,item_quantity_unit }) => {
  const {removeItemDataToCart} = useContext(DailyItemsList);
  return (
    <div className="product border-0  overflow-hidden shrink-0 h-auto rounded-xl flex gap-5  p-0.2 shadow-[0_2px_5px_-1px_rgba(50,50,93,0.25),0_1px_3px_-1px_rgba(0,0,0,0.3)] p-2 m-2 bg-white w-[90%]">
      <img src={item_image} alt="" className="rounded-2xl w-[20%] h-full" />
      <div className="flex justify-between  w-[70%] gap-3">
        <div className="flex flex-col justify-center ">
         
          <div className="name">
            <h2 className="text-[12px] font-semibold ">{item_name}</h2>
          </div>
          <div className="quantity">
            {/* <p className="text-xs">{item_quantity}{item_quantity_unit}</p> */}
            {/* <p className="text-xs"></p> */}
          </div>
        </div>
        <div className="bottomDiv flex justify-between items-center text-xs">
          {/* <div className="price font-bold">₹{getRandomPrice()}</div> */}
          <div
            className="add-btn border-1 px-4 py-1 border-[#318616] bg-[#318616] flex justify-center rounded cursor-pointer"
            onClick={() => {
              removeItemDataToCart(item_id);  
            }}
          >
            <button className="btn text-white text-xs  ">
              <FiMinusCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
