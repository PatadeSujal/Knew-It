"use client";
import { createContext, useState, useEffect } from "react";

export const DailyItemsList = createContext({
  searchItems: [],
  cartItems: [],
  addItemDataToCart: () => {},
  toggleCart: false,
  tfLabel: "protein",
  generalProducts:[],

});
const getRandomPrice = (min = 10, max = 50) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const ItemListProvider = ({ children }) => {
  const [searchItems, setSearchItems] = useState(null);
 
  const [toggleCart, setToggleCart] = useState(false);
  const [tfLabel, setTfLabel] = useState("protein");
  const [generalProducts,setGeneralProducts] = useState([]);


  let [cartItems, setCartItems] = useState([]);
  const addItemDataToCart = (id) => {
    fetch(`https://world.openfoodfacts.org/api/v2/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const price = getRandomPrice();
        if (data && data.product) {
          const product = data.product;
          const cartItem = {
            id: product.id,
            name: product.product_name,
            image: product.image_front_url,
            quantity: 1,
            protein: parseFloat(product.nutriments?.proteins_100g) ,
            fats: parseFloat(product.nutriments?.["saturated-fat_100g"]),
            sugars: parseFloat(product.nutriments?.sugars_100g),
            nutrients:product.nutriments,
          };
          setCartItems((prevItems) => [...prevItems, cartItem]);
        }
      })
      .catch((err) => console.error("Error adding item to cart:", err));
  };
 const removeItemDataToCart = (item_id) => {
  setCartItems((prevItems) => {
    const updatedItems = prevItems.filter(item => item.id !== item_id);
    if (updatedItems.length < prevItems.length) {
    } else {
      alert("Item not found");
    }
    return updatedItems;
  });
};

  return (
    <DailyItemsList.Provider
      value={{
        searchItems,
        cartItems,
        addItemDataToCart,
        toggleCart,
        setToggleCart,
        tfLabel,
        setTfLabel,
        setSearchItems,
        generalProducts,
        setGeneralProducts,
        removeItemDataToCart,
      }}
    >
      {children}
    </DailyItemsList.Provider>
  );
};
