import { useContext, useEffect, useState } from "react";
import Product from "./Product";
import DisplayCart from "./DisplayCart";
import { DailyItemsList, ItemListProvider } from "../store/items-store";
import { setTraficLabel } from "../actions/nutrient";
import { ShimmerThumbnail } from "react-shimmer-effects";
const DisplayProducts = ({title}) => {

    const [categoryItems, setCategoryItems] = useState([]);   
    const [trans,setTrans] = useState(0);
    const{tfLabel} = useContext(DailyItemsList);
    const [loading,setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    fetch(
      `https://in.openfoodfacts.org/cgi/search.pl?search_terms=${title}&search_simple=1&json=1&page_size=50&fields=product_name,nutriments,id,image_front_url,proteins_100g,saturated-fat_100g,trans-fat_100g,sugars_100g,product_quantity,product_quantity_unit&sort_by=popularity`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategoryItems(data.products);
        setLoading(false);
      });
  }, [tfLabel]);
  return (
    <div className="products my-5 mx-auto sm:w-[80%] md:w-[90%] w-[100%] overflow-hidden ">
      {loading ?(
          <ShimmerThumbnail className="m-0 w-[70%]" rounded />
      ):(
        <div className="overflow-hidden">
        
        
      <div className="title my-5  flex justify-between mx-3">
        <h1 className="text-xl font-bold">{title}</h1>
        <h1 className="text-green-800 cursor-pointer">See More</h1>

      </div>

      <div className="flex items-center justify-between">
        {/* Left Button */}
        <button
          className="bg-green-800 text-white rounded-full p-2 cursor-pointer hidden sm:inline"
            onClick={() => setTrans((prev) => prev + 35)}
        >
          &lt;&lt;
        </button>

        {/* Slider */}
        <div className="w-[90%]  overflow-x-auto overflow-y-hidden overflow-hidden">
          <div
            className="sm:flex  flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${trans}%)` }}
          >
            {categoryItems.map((item, index) => (
              // <ItemListProvider>

              <Product
                key={index}
                item_name={item.product_name}
                item_quantity={item.product_quantity}
                item_image={item.image_front_url}
                item_id = {item.id}
                // item_protein={item[setTraficLabel(tfLabel)]}
                item_protein={item[setTraficLabel(tfLabel)]}
                item_quantity_unit={item.product_quantity_unit}
                
                />
               // {/* </ItemListProvider> */}
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          className="bg-green-800 text-white rounded-full p-2 cursor-pointer hidden sm:inline"
        
          onClick={() => setTrans((prev) => prev - 35)}
        >
          &gt;&gt;
        </button>
      </div>
 </div>
      )
      }
    </div>
  );
};
export default DisplayProducts;
