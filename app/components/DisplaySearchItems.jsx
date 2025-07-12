import { useContext, useEffect } from "react";
import DailyItem from "./components/DailyItem";
import { DailyItemsList } from "./store/items-store";
import GeneralProducts from "./GeneralProducts";

const DisplayDailyItems = () => {
  const { dailyItems } = useContext(DailyItemsList);
  return (
    <>
    
      <GeneralProducts/>
    </>
  );
};
export default DisplayDailyItems;
