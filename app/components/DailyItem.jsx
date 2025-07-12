import { useContext, useEffect } from "react";
import { DailyItemsList } from "../store/items-store";

function DailyItem({thumbnail}) {
    // console.log(thumbnail);
    return<>
        <div className="contaienr w-[10%]">
            <img src={thumbnail} alt="" />
        </div>

    </>
}
export default DailyItem;